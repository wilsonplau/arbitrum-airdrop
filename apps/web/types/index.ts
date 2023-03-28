import type { Claim } from "@prisma/client";

export interface TokenBalanceClient {
  address: string;
  balance: string;
}

export interface ClaimClient {
  address: string;
  amount: string;
  claimedAmount: string;
  hasClaimed: boolean;
}

export interface GetClaimsRequest {
  address?: string | string[];
  cursor?: string | string[];
  limit?: string | string[];
}

export interface GetClaimsResponse {
  claims: ClaimClient[];
}

export interface GetClaimStatsResponse {
  sum: string;
  avg: string;
  count: number;
}

export interface GetClaimDistributionResponse {
  count: { [key: string]: string };
  sum: { [key: string]: string };
}

export interface GetTokenBalancesRequest {}

export interface GetTokenBalancesResponse {
  balances: TokenBalanceClient[];
  count: number;
}

export interface GetTokenSupplyRequest {}

export interface GetTokenSupplyResponse {
  supply: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string;
}

export interface ErrorResponse {
  error: string;
}

export interface JobResponse {
  success: boolean;
}

export { Claim };
