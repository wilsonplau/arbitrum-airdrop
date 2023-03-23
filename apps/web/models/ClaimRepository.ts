import prisma from "~/prisma";
import { Prisma, Claim } from "@prisma/client";
import { ClaimClient } from "~/types";

export default class ClaimRepository {
  static async get(address: string): Promise<ClaimClient | null> {
    const result = await prisma.claim.findUnique({ where: { address } });
    return result ? this.convertToClient(result) : null;
  }
  static async getMany(
    cursor?: string,
    limit: number = 10
  ): Promise<ClaimClient[]> {
    const results = await prisma.claim.findMany({
      orderBy: [{ amountNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return results.map(this.convertToClient);
  }
  static async findMany(
    query: Partial<Claim>,
    cursor?: string,
    limit: number = 10
  ) {
    // Only support findMany by partial address
    const where: Prisma.ClaimWhereInput = {};
    if (query.address) where["address"] = { contains: query.address };
    const results = await prisma.claim.findMany({
      where,
      orderBy: [{ amountNumber: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return results.map(this.convertToClient);
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
  static async getDistribution(): Promise<{
    count: { [key: string]: number };
    sum: { [key: string]: number };
  }> {
    const count: { [key: string]: number } = {};
    const sum: { [key: string]: number } = {};
    const results = await prisma.claim.groupBy({
      by: ["amountNumber"],
      _count: { amountNumber: true },
      _sum: { amountNumber: true },
    });
    for (const result of results) {
      count[Number(result.amountNumber)] = result._count.amountNumber;
      sum[Number(result.amountNumber)] = Number(result._sum.amountNumber) || 0;
    }
    return { count, sum };
  }
  private static convertToClient(claim: Claim): ClaimClient {
    return {
      ...claim,
      amountNumber: Number(claim.amountNumber),
      claimedAmountNumber: Number(claim.claimedAmountNumber),
    };
  }
}
