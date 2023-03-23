import {
  ARBITRUM_TOKEN_DECIMALS,
  CAN_CLAIM_EVENT_HASH,
  CAN_CLAIM_EVENT_INTERFACE,
  HAS_CLAIMED_EVENT_HASH,
  HAS_CLAIMED_EVENT_INTERFACE,
} from "~/constants";
import prisma from "~/prisma";
import { Prisma, Event } from "@prisma/client";

const BATCH_SIZE = 1000;

export default class UserAirdropProcessingService {
  // Process in parallel because order doesn't matter
  public static async processCanClaimEvents() {
    const claimData: Prisma.ClaimCreateManyInput[] = [];
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
      claimData.push({
        address,
        amountString: amount.toString(),
        amountNumber: amount / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS),
      });
      eventIds.push(event.id);
    }
    await prisma.$transaction([
      prisma.claim.createMany({ data: claimData, skipDuplicates: true }),
      prisma.event.updateMany({
        where: { id: { in: eventIds } },
        data: { isProcessed: true },
      }),
    ]);
  }

  // Process sequentially because order matters
  public static async proessHasClaimedEvents() {
    const events = await prisma.event.findMany({
      where: {
        eventHash: `0x${HAS_CLAIMED_EVENT_HASH}`,
        isProcessed: false,
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
      take: BATCH_SIZE,
    });
    for (const event of events) await this.proessHasClaimedEvent(event);
  }
  private static async proessHasClaimedEvent(event: Event): Promise<void> {
    const log = HAS_CLAIMED_EVENT_INTERFACE.parseLog(event);
    if (!log) return;
    const address = log.args[0];
    const amount = BigInt(log.args[1]);
    const claim = await prisma.claim.findUnique({ where: { address } });
    if (!claim) throw new Error("Invalid transaction.");
    const newAmount = BigInt(claim.claimedAmountString) + amount;
    await prisma.$transaction([
      prisma.claim.update({
        where: { address },
        data: {
          claimedAmountString: newAmount.toString(),
          claimedAmountNumber:
            newAmount / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS),
          hasClaimed: true,
        },
      }),
      prisma.event.update({
        where: { id: event.id },
        data: { isProcessed: true },
      }),
    ]);
  }
}
