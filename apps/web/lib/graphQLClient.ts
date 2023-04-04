import { request } from "graphql-request";
import getTokenBalancesQuery from "~/lib/queries/getTokenBalancesQuery";

const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/wilsonplau/arb-subgraph";

export default class graphQLClient {
  static async getTokenBalances(address: string, skip: number, limit: number) {
    const data = await request(SUBGRAPH_URL, getTokenBalancesQuery, {
      address,
      skip,
      limit,
    });
    return data.tokenBalances;
  }
}
