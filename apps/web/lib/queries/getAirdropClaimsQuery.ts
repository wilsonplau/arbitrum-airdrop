import { graphql } from "~/lib/gql/gql";

const getAirdropClaimsQuery = graphql(`
  query getAirdropClaims($address: Bytes!, $skip: Int!, $limit: Int!) {
    airdropClaims(
      where: { id_contains: $address }
      orderBy: amount
      orderDirection: desc
      first: $limit
      skip: $skip
    ) {
      id
      amount
      claimedAmount
      hasClaimed
    }
  }
`);

export default getAirdropClaimsQuery;
