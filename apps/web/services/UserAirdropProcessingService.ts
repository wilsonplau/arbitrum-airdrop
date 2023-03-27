import {
  CAN_CLAIM_EVENT_HASH,
  CAN_CLAIM_EVENT_INTERFACE,
  HAS_CLAIMED_EVENT_HASH,
  HAS_CLAIMED_EVENT_INTERFACE,
} from "~/constants";
import prisma from "~/prisma";
import { Prisma } from "@prisma/client";

const BATCH_SIZE = 25000;

export default class UserAirdropProcessingService {
  public static async processCanClaimEvents() {
    const claimEventData: Prisma.CanClaimEventCreateManyInput[] = [];
    const eventIds: string[] = [];
    const events = await prisma.event.findMany({
      where: {
        eventHash: `0x${CAN_CLAIM_EVENT_HASH}`,
        isProcessed: false,
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
      take: BATCH_SIZE,
    });
    for (const event of events) {
      const log = CAN_CLAIM_EVENT_INTERFACE.parseLog(event);
      if (!log) continue;
      const address = log.args[0];
      const amount = BigInt(log.args[1]);
      claimEventData.push({
        id: event.id,
        transactionHash: event.transactionHash,
        transactionIndex: event.transactionIndex,
        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        logIndex: event.logIndex,
        address,
        amount: amount.toString(),
      });
      eventIds.push(event.id);
    }
    await prisma.$transaction([
      prisma.canClaimEvent.createMany({
        data: claimEventData,
        skipDuplicates: true,
      }),
      prisma.event.updateMany({
        where: { id: { in: eventIds } },
        data: { isProcessed: true },
      }),
    ]);
  }
  public static async processHasClaimedEvents() {
    const claimEventData: Prisma.HasClaimedEventCreateManyInput[] = [];
    const eventIds: string[] = [];
    const events = await prisma.event.findMany({
      where: {
        eventHash: `0x${HAS_CLAIMED_EVENT_HASH}`,
        isProcessed: false,
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
      take: BATCH_SIZE,
    });
    for (const event of events) {
      const log = HAS_CLAIMED_EVENT_INTERFACE.parseLog(event);
      if (!log) continue;
      const address = log.args[0];
      const amount = BigInt(log.args[1]);
      claimEventData.push({
        id: event.id,
        transactionHash: event.transactionHash,
        transactionIndex: event.transactionIndex,
        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        logIndex: event.logIndex,
        address,
        amount: amount.toString(),
      });
      eventIds.push(event.id);
    }
    await prisma.$transaction([
      prisma.hasClaimedEvent.createMany({
        data: claimEventData,
        skipDuplicates: true,
      }),
      prisma.event.updateMany({
        where: { id: { in: eventIds } },
        data: { isProcessed: true },
      }),
    ]);
  }
}
