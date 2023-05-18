import { graphql } from "~/lib/gql/gql";

const getAirdropHistoryQuery = graphql(`
  query getAirdropHistory($skip: Int) {
    airdropClaimStats(
      orderBy: timestamp
      orderDirection: asc
      first: 1000
      skip: $skip
    ) {
      id
      timestamp
      totalAmount
      totalRecipients
    }
  }
`);

export default getAirdropHistoryQuery;
