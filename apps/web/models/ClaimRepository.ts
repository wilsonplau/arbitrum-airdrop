import prisma from "~/prisma";
import { Prisma, Claim } from "@prisma/client";

export default class ClaimRepository {
  static async get(address: string): Promise<Claim | null> {
    return prisma.claim.findUnique({ where: { address } });
  }
  static async getMany(cursor?: string, limit: number = 10): Promise<Claim[]> {
    return prisma.claim.findMany({
      orderBy: [{ amountNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
    });
  }
  static async findMany(
    query: Partial<Claim>,
    cursor?: string,
    limit: number = 10
  ) {
    // Only support findMany by partial address
    const where: Prisma.ClaimWhereInput = {};
    if (query.address) where["address"] = { contains: query.address };
    return prisma.claim.findMany({
      where,
      orderBy: [{ amountNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
    });
  }
  static async getStats(): Promise<{
    sum: number;
    avg: number;
    count: number;
  }> {
    const agg = await prisma.claim.aggregate({
      _sum: { amountNumber: true },
      _avg: { amountNumber: true },
      _count: true,
    });
    return {
      sum: agg._sum.amountNumber || 0,
      avg: agg._avg.amountNumber || 0,
      count: agg._count || 0,
    };
  }
}
