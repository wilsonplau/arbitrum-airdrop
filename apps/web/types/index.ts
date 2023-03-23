import type { Claim } from "@prisma/client";

export interface TokenBalanceClient {
  address: string;
  balance: number;
}

export interface ClaimClient {
  address: string;
  amountString: string;
  amountNumber: number;
  hasClaimed: boolean;
  claimedAmountString: string;
  claimedAmountNumber: number;
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
  sum: number;
  avg: number;
  count: number;
}

export interface GetClaimDistributionResponse {
  count: { [key: string]: number };
  sum: { [key: string]: number };
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
