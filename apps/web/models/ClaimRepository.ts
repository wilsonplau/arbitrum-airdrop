import prisma from "~/prisma";
import { Prisma, Claim } from "@prisma/client";
import { ClaimClient } from "~/types";

export default class ClaimRepository {
  static async refresh() {
    await prisma.$executeRaw`REFRESH MATERIALIZED VIEW "Claim";`;
  }
  static async get(address: string): Promise<ClaimClient | null> {
    const result = await prisma.claim.findUnique({ where: { address } });
    return result ? this.convertToClient(result) : null;
  }
  static async getMany(
    cursor?: string,
    limit: number = 10
  ): Promise<ClaimClient[]> {
    const results = await prisma.claim.findMany({
      orderBy: [{ amount: "desc" }, { address: "asc" }],
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
      orderBy: [{ amount: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return results.map(this.convertToClient);
  }
  static async getStats(): Promise<{
    sum: string;
    avg: string;
    count: number;
  }> {
    const agg = await prisma.claim.aggregate({
      _sum: { amount: true },
      _avg: { amount: true },
      _count: true,
    });
    return {
      sum: agg._sum.amount?.toFixed() || "0",
      avg: agg._avg.amount?.toFixed() || "0",
      count: agg._count || 0,
    };
  }
  static async getDistribution(): Promise<{
    count: { [key: string]: string };
    sum: { [key: string]: string };
  }> {
    const count: { [key: string]: string } = {};
    const sum: { [key: string]: string } = {};
    const results = await prisma.claim.groupBy({
      by: ["amount"],
      _count: { amount: true },
      _sum: { amount: true },
    });
    for (const result of results) {
      count[result.amount.toFixed()] = result._count.amount.toFixed();
      sum[result.amount.toFixed()] = result._sum.amount?.toFixed() || "0";
    }
    return { count, sum };
  }
  private static convertToClient(claim: Claim): ClaimClient {
    return {
      ...claim,
      amount: claim.amount.toFixed(),
      claimedAmount: claim.claimedAmount.toFixed(),
    };
  }
}
