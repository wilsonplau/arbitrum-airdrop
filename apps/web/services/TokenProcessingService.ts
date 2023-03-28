import { Prisma } from "@prisma/client";
import { TRANSFER_EVENT_HASH, TRANSFER_EVENT_INTERFACE } from "~/constants";
import prisma from "~/prisma";

const BATCH_SIZE = 25000;

export default class TokenProcessingService {
  public static async processTransferEvents(): Promise<void> {
    const transferEventData: Prisma.TransferEventCreateManyInput[] = [];
    const eventIds: string[] = [];
    const events = await prisma.event.findMany({
      where: {
        eventHash: `0x${TRANSFER_EVENT_HASH}`,
        isProcessed: false,
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
      take: BATCH_SIZE,
    });
    for (const event of events) {
      const logDescription = TRANSFER_EVENT_INTERFACE.parseLog(event);
      if (!logDescription) continue;
      const from = logDescription.args[0] as string;
      const to = logDescription.args[1] as string;
      const value = BigInt(logDescription.args[2] as string);
      transferEventData.push({
        id: event.id,
        transactionHash: event.transactionHash,
        transactionIndex: event.transactionIndex,
        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        logIndex: event.logIndex,
        to,
        from,
        value: value.toString(),
      });
      eventIds.push(event.id);
    }
    await prisma.$transaction([
      prisma.transferEvent.createMany({
        data: transferEventData,
        skipDuplicates: true,
      }),
      prisma.event.updateMany({
        where: { id: { in: eventIds } },
        data: { isProcessed: true },
      }),
    ]);
  }
}
