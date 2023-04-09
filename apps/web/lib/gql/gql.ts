/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getAirdropClaims($address: Bytes!, $skip: Int!, $limit: Int!) {\n    airdropClaims(\n      where: { id_contains: $address }\n      orderBy: amount\n      orderDirection: desc\n      first: $limit\n      skip: $skip\n    ) {\n      id\n      amount\n      claimedAmount\n      hasClaimed\n    }\n  }\n": types.GetAirdropClaimsDocument,
    "\n  query getAirdropDistribution {\n    airdropDistributionStats {\n      id\n      amount\n      totalAmount\n      totalRecipients\n    }\n  }\n": types.GetAirdropDistributionDocument,
    "\n  query getAirdropHistory($skip: Int) {\n    airdropClaimStats(\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1000\n      skip: $skip\n    ) {\n      id\n      timestamp\n      totalAmount\n      totalRecipients\n    }\n  }\n": types.GetAirdropHistoryDocument,
    "\n  query getAirdropStats {\n    airdropStat(id: \"total\") {\n      id\n      totalAmount\n      totalRecipients\n      totalClaimedAmount\n      totalClaimedRecipients\n    }\n  }\n": types.GetAirdropStatsDocument,
    "\n  query getTokenBalances($address: Bytes, $limit: Int, $skip: Int) {\n    tokenBalances(\n      where: { address_contains: $address }\n      first: $limit\n      skip: $skip\n      orderBy: balance\n      orderDirection: desc\n    ) {\n      address\n      balance\n    }\n  }\n": types.GetTokenBalancesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAirdropClaims($address: Bytes!, $skip: Int!, $limit: Int!) {\n    airdropClaims(\n      where: { id_contains: $address }\n      orderBy: amount\n      orderDirection: desc\n      first: $limit\n      skip: $skip\n    ) {\n      id\n      amount\n      claimedAmount\n      hasClaimed\n    }\n  }\n"): (typeof documents)["\n  query getAirdropClaims($address: Bytes!, $skip: Int!, $limit: Int!) {\n    airdropClaims(\n      where: { id_contains: $address }\n      orderBy: amount\n      orderDirection: desc\n      first: $limit\n      skip: $skip\n    ) {\n      id\n      amount\n      claimedAmount\n      hasClaimed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAirdropDistribution {\n    airdropDistributionStats {\n      id\n      amount\n      totalAmount\n      totalRecipients\n    }\n  }\n"): (typeof documents)["\n  query getAirdropDistribution {\n    airdropDistributionStats {\n      id\n      amount\n      totalAmount\n      totalRecipients\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAirdropHistory($skip: Int) {\n    airdropClaimStats(\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1000\n      skip: $skip\n    ) {\n      id\n      timestamp\n      totalAmount\n      totalRecipients\n    }\n  }\n"): (typeof documents)["\n  query getAirdropHistory($skip: Int) {\n    airdropClaimStats(\n      orderBy: timestamp\n      orderDirection: asc\n      first: 1000\n      skip: $skip\n    ) {\n      id\n      timestamp\n      totalAmount\n      totalRecipients\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAirdropStats {\n    airdropStat(id: \"total\") {\n      id\n      totalAmount\n      totalRecipients\n      totalClaimedAmount\n      totalClaimedRecipients\n    }\n  }\n"): (typeof documents)["\n  query getAirdropStats {\n    airdropStat(id: \"total\") {\n      id\n      totalAmount\n      totalRecipients\n      totalClaimedAmount\n      totalClaimedRecipients\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTokenBalances($address: Bytes, $limit: Int, $skip: Int) {\n    tokenBalances(\n      where: { address_contains: $address }\n      first: $limit\n      skip: $skip\n      orderBy: balance\n      orderDirection: desc\n    ) {\n      address\n      balance\n    }\n  }\n"): (typeof documents)["\n  query getTokenBalances($address: Bytes, $limit: Int, $skip: Int) {\n    tokenBalances(\n      where: { address_contains: $address }\n      first: $limit\n      skip: $skip\n      orderBy: balance\n      orderDirection: desc\n    ) {\n      address\n      balance\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;