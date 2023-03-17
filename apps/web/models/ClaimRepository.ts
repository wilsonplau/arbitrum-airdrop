import prisma from "~/prisma";
import { Claim } from "@prisma/client";

export default class ClaimRepository {
  static async get(address: string): Promise<Claim | null> {
    return prisma.claim.findUnique({ where: { address } });
  }
  static async getMany(
    offset: number = 0,
    limit: number = 10
  ): Promise<Claim[]> {
    return prisma.claim.findMany({
      orderBy: { amountNumber: "desc" },
      skip: offset,
      take: limit,
    });
  }
  static async findManyByAddress(
    partialAddr: string,
    offset: number = 0,
    limit: number = 10
  ) {
    console.log(partialAddr);
    return prisma.claim.findMany({
      where: { address: { contains: partialAddr } },
      orderBy: { amountNumber: "desc" },
      skip: offset,
      take: limit,
    });
  }
  static async getStats(): Promise<{ sum: number; avg: number }> {
    const agg = await prisma.claim.aggregate({
      _sum: { amountNumber: true },
      _avg: { amountNumber: true },
    });
    return { sum: agg._sum.amountNumber || 0, avg: agg._avg.amountNumber || 0 };
  }
}
