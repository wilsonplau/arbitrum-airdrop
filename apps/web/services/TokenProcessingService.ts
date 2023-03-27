import { Event } from "@prisma/client";
import { ZeroAddress } from "ethers";
import {
  ARBITRUM_TOKEN_ADDRESS,
  ARBITRUM_TOKEN_DECIMALS,
  TRANSFER_EVENT_HASH,
  TRANSFER_EVENT_INTERFACE,
} from "~/constants";
import prisma from "~/prisma";

const BATCH_SIZE = 1000;

export default class TokenProcessingService {
  public static async processTransferEvents(): Promise<void> {
    const logs = await prisma.event.findMany({
      where: {
        eventHash: `0x${TRANSFER_EVENT_HASH}`,
        isProcessed: false,
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
      take: BATCH_SIZE,
    });
    for (const log of logs) await this.processTransferEvent(log);
  }
  private static async processTransferEvent(event: Event): Promise<void> {
    const logDescription = TRANSFER_EVENT_INTERFACE.parseLog(event);
    if (!logDescription) return;

    const from = logDescription.args[0] as string;
    const to = logDescription.args[1] as string;
    const value = logDescription.args[2] as string;
    if (BigInt(value) === BigInt(0) || from === to) {
      await prisma.event.update({
        where: { id: event.id },
        data: { isProcessed: true },
      });
      return;
    }

    const updates = [];

    if (from != ZeroAddress) {
      const fromUser = await prisma.tokenBalance.findUnique({
        where: { address: from },
      });
      if (!fromUser) {
        console.log({ from, to, value });
        throw new Error("Invalid transaction.");
      }
      const newBalance = BigInt(fromUser.balanceString) - BigInt(value);
      const balanceNumber = newBalance / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS);
      updates.push(
        prisma.tokenBalance.update({
          where: { address: from },
          data: {
            balanceString: newBalance.toString(),
            balanceNumber,
          },
        })
      );
    }
    if (to != ZeroAddress) {
      const toUser = await prisma.tokenBalance.findUnique({
        where: { address: to },
      });
      if (toUser) {
        const newBalance = BigInt(toUser.balanceString) + BigInt(value);
        const balanceNumber =
          newBalance / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS);
        updates.push(
          prisma.tokenBalance.update({
            where: { address: to },
            data: {
              balanceString: newBalance.toString(),
              balanceNumber,
            },
          })
        );
      } else {
        const balanceNumber =
          BigInt(value) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS);
        updates.push(
          prisma.tokenBalance.create({
            data: {
              address: to,
              balanceString: value.toString(),
              balanceNumber,
              token: ARBITRUM_TOKEN_ADDRESS,
            },
          })
        );
      }
    }
    updates.push(
      prisma.event.update({
        where: { id: event.id },
        data: { isProcessed: true },
      })
    );
    await prisma.$transaction(updates);
  }
}
