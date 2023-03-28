import prisma from "~/prisma";
import { Prisma, Claim } from "@prisma/client";
import { ClaimClient } from "~/types";
import { convertTokenAmount } from "~/utils";

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
    if (query.address)
      where["address"] = { contains: query.address.toLowerCase() };
    const results = await prisma.claim.findMany({
      where,
      orderBy: [{ amount: "desc" }, { address: "asc" }],
      cursor: cursor ? { address: cursor } : undefined,
      take: limit,
      skip: cursor ? 1 : 0,
    });
    return results.map(this.convertToClient);
  }
  static async getClaimStats(): Promise<{
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
  static async getClaimedStats(): Promise<{
    sum: string;
    avg: string;
    count: number;
  }> {
    const agg = await prisma.claim.aggregate({
      _sum: { claimedAmount: true },
      _avg: { claimedAmount: true },
      _count: true,
      where: { hasClaimed: true },
    });
    return {
      sum: agg._sum.claimedAmount?.toFixed() || "0",
      avg: agg._avg.claimedAmount?.toFixed() || "0",
      count: agg._count || 0,
    };
  }
  static async getClaimDistribution(): Promise<{
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
  static async getClaimedDistribution() {
    const data = await prisma.$queryRaw<
      {
        blockNumber: number;
        sum: Prisma.Decimal;
        count: number;
      }[]
    >`
      WITH roundedBlockNumbers AS (
	      SELECT 
          SUM(amount) AS sum, 
          COUNT(*) AS count,
          ROUND("HasClaimedEvent"."blockNumber",-4) AS "blockNumber"
        FROM "HasClaimedEvent"
  	    GROUP BY ROUND("HasClaimedEvent"."blockNumber",-4)
      ) SELECT 
          "blockNumber", 
          SUM(sum) OVER (ORDER BY "blockNumber") AS sum,
	        SUM(count) OVER (ORDER BY "blockNumber") AS count
        FROM roundedBlockNumbers;
  `;
    return data.map(({ blockNumber, sum, count }) => ({
      blockNumber: Number(blockNumber),
      sum: sum.toFixed(),
      count: Number(count),
    }));
  }
  private static convertToClient(claim: Claim): ClaimClient {
    return {
      ...claim,
      amount: claim.amount.toFixed(),
      claimedAmount: claim.claimedAmount.toFixed(),
    };
  }
}
