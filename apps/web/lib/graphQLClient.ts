import { request } from "graphql-request";
import getTokenBalancesQuery from "~/lib/queries/getTokenBalancesQuery";
import getAirdropDistributionQuery from "~/lib/queries/getAirdropDistributionQuery";
import getAirdropStatsQuery from "~/lib/queries/getAirdropStatsQuery";
import { AirdropDistributionStat, AirdropStats } from "./gql/graphql";

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL!;

export default class graphQLClient {
  static async getTokenBalances(address: string, skip: number, limit: number) {
    const data = await request(SUBGRAPH_URL, getTokenBalancesQuery, {
      address,
      skip,
      limit,
    });
    return data.tokenBalances;
  }
  static async getAirdropStats(): Promise<AirdropStats> {
    const data = await request(SUBGRAPH_URL, getAirdropStatsQuery, {});
    return data.airdropStats[0];
  }
  static async getAirdropDistribution(): Promise<AirdropDistributionStat[]> {
    const data = await request(SUBGRAPH_URL, getAirdropDistributionQuery, {});
    return data.airdropDistributionStats;
  }
}
