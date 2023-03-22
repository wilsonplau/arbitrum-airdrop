import axios from "axios";
import {
  Claim,
  GetClaimDistributionResponse,
  GetClaimsResponse,
  GetClaimStatsResponse,
  GetTokenBalancesResponse,
  GetTokenSupplyResponse,
} from "~/types";

axios.defaults.baseURL = "/api";

export default class apiClient {
  static async getClaims(
    query: string,
    cursor?: string,
    limit?: number
  ): Promise<Claim[]> {
    const res = await axios.get<GetClaimsResponse>("/claims", {
      params: { address: query, cursor, limit },
    });
    return res.data.claims;
  }
  static async getClaimStats(): Promise<GetClaimStatsResponse> {
    const res = await axios.get<GetClaimStatsResponse>("/claims/stats");
    return res.data;
  }
  static async getClaimsDistribution(): Promise<GetClaimDistributionResponse> {
    const res = await axios.get<GetClaimDistributionResponse>(
      "/claims/distribution"
    );
    return res.data;
  }
  static async getTokenBalances(
    query: string,
    cursor?: string,
    limit?: number
  ): Promise<GetTokenBalancesResponse> {
    const res = await axios.get<GetTokenBalancesResponse>("/token/balances", {
      params: { address: query, cursor, limit },
    });
    return res.data;
  }
  static async getTokenSupply(): Promise<number> {
    const res = await axios.get<GetTokenSupplyResponse>("/token/supply");
    return res.data.supply;
  }
}
