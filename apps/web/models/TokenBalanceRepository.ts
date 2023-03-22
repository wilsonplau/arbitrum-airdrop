import prisma from "~/prisma";
import { Prisma, TokenBalance } from "@prisma/client";
import { ARBITRUM_TOKEN_ADDRESS } from "~/constants";
import { TokenBalanceClient } from "~/types";

export default class TokenBalanceRepository {
  static async count(): Promise<number> {
    return prisma.tokenBalance.count({
      where: { token: ARBITRUM_TOKEN_ADDRESS, balanceNumber: { gt: 0 } },
    });
  }
  static async create(
    data: Prisma.TokenBalanceCreateInput
  ): Promise<TokenBalanceClient> {
    const tokenBalance = await prisma.tokenBalance.create({ data });
    return this.convertToClient(tokenBalance);
  }
  static async get(address: string): Promise<TokenBalanceClient | null> {
    const data = await prisma.tokenBalance.findUnique({ where: { address } });
    return data ? this.convertToClient(data) : null;
  }
  static async getMany(
    cursor?: string,
    limit: number = 10
  ): Promise<TokenBalanceClient[]> {
    const data = await prisma.tokenBalance.findMany({
      where: { token: ARBITRUM_TOKEN_ADDRESS, balanceNumber: { gt: 0 } },
      orderBy: [{ balanceNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return data.map(this.convertToClient);
  }
  static async findMany(
    query: Partial<TokenBalance>,
    cursor?: string,
    limit: number = 10
  ): Promise<TokenBalanceClient[]> {
    // Only support findMany by partial address
    const where: Prisma.TokenBalanceWhereInput = {
      token: ARBITRUM_TOKEN_ADDRESS,
      balanceNumber: { gt: 0 },
    };
    if (query.address) where["address"] = { contains: query.address };
    const data = await prisma.tokenBalance.findMany({
      where,
      orderBy: [{ balanceNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return data.map(this.convertToClient);
  }
  static async update(
    address: string,
    data: Prisma.TokenBalanceUpdateInput
  ): Promise<TokenBalanceClient | null> {
    const tokenBalance = await prisma.tokenBalance.update({
      where: { address },
      data,
    });
    return tokenBalance ? this.convertToClient(tokenBalance) : null;
  }
  private static convertToClient(
    tokenBalance: TokenBalance
  ): TokenBalanceClient {
    return {
      address: tokenBalance.address,
      balance: Number(tokenBalance.balanceNumber),
    };
  }
}
