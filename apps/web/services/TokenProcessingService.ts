import { Event } from "@prisma/client";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { ethers, ZeroAddress } from "ethers";
import { ARBITRUM_TOKEN_ADDRESS } from "~/constants";
import TokenBalanceRepository from "~/models/TokenBalanceRepository";
import prisma from "~/prisma";

export const TOKEN_TRANSFER_EVENT_HASH = toHex(
  keccak256(utf8ToBytes("Transfer(address,address,uint256)"))
);
export const TOKEN_TRANSFER_EVENT_INTERFACE = ethers.Interface.from([
  "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

export default class TokenProcessingService {
  public static async processTransferEventLogs(): Promise<void> {
    const logs = await prisma.event.findMany({
      where: {
        eventHash: `0x${TOKEN_TRANSFER_EVENT_HASH}`,
        tokenBalances: { none: {} },
      },
      orderBy: [{ blockNumber: "asc" }, { logIndex: "asc" }],
    });
    for (const log of logs) await this.processTransferEventLog(log);
  }
  private static async processTransferEventLog(log: Event): Promise<void> {
    const logDescription = TOKEN_TRANSFER_EVENT_INTERFACE.parseLog(log);
    if (!logDescription) return;

    const from = logDescription.args[0] as string;
    const to = logDescription.args[1] as string;
    const value = logDescription.args[2] as string;
    if (BigInt(value) === BigInt(0)) return;

    const updates = [];

    if (from != ZeroAddress) {
      const fromUser = await TokenBalanceRepository.get(from);
      if (!fromUser) {
        console.log({ from, to, value });
        throw new Error("Invalid transaction.");
      }
      const newBalance = BigInt(fromUser.balance) - BigInt(value);
      updates.push(
        prisma.tokenBalance.update({
          where: { address: from },
          data: {
            balance: newBalance.toString(),
            events: { connect: { id: log.id } },
          },
        })
      );
    }

    if (to != ZeroAddress) {
      const toUser = await TokenBalanceRepository.get(to);
      if (toUser) {
        const newBalance = BigInt(toUser.balance) + BigInt(value);
        updates.push(
          prisma.tokenBalance.update({
            where: { address: to },
            data: {
              balance: newBalance.toString(),
              events: { connect: { id: log.id } },
            },
          })
        );
      } else {
        updates.push(
          prisma.tokenBalance.create({
            data: {
              address: to,
              balance: value.toString(),
              token: ARBITRUM_TOKEN_ADDRESS,
              events: { connect: { id: log.id } },
            },
          })
        );
      }
    }
    await prisma.$transaction(updates);
  }
}
