import type { Claim } from "@prisma/client";

export interface GetClaimsRequest {
  address?: string | string[];
  cursor?: string | string[];
  limit?: string | string[];
}

export interface GetClaimsResponse {
  claims: Claim[];
}

export interface GetClaimStatsResponse {
  sum: number;
  avg: number;
  count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string;
}

export interface ErrorResponse {
  error: string;
}

export { Claim };
