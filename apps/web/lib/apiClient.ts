import axios from "axios";
import {
  Claim,
  GetClaimDistributionResponse,
  GetClaimsResponse,
  GetClaimStatsResponse,
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
}
