import { request } from "graphql-request";
import getTokenBalancesQuery from "~/lib/queries/getTokenBalancesQuery";
import getAirdropDistributionQuery from "~/lib/queries/getAirdropDistributionQuery";
import getAirdropStatsQuery from "~/lib/queries/getAirdropStatsQuery";
import {
  AirdropDistributionStat,
  AirdropStat,
  CumulativeAirdropClaimStat,
} from "./gql/graphql";
import getAirdropClaimsQuery from "./queries/getAirdropClaimsQuery";
import getAirdropClaimHistoryQuery from "./queries/getAirdropClaimHistoryQuery";

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
  static async getAirdropClaims(address: string, skip: number, limit: number) {
    const data = await request(SUBGRAPH_URL, getAirdropClaimsQuery, {
      address,
      skip,
      limit,
    });
    return data.airdropClaims;
  }
  static async getAirdropStats(): Promise<AirdropStat | null> {
    const data = await request(SUBGRAPH_URL, getAirdropStatsQuery, {});
    return data.airdropStat || null;
  }
  static async getAirdropDistribution(): Promise<AirdropDistributionStat[]> {
    const data = await request(SUBGRAPH_URL, getAirdropDistributionQuery, {});
    return data.airdropDistributionStats;
  }
}
