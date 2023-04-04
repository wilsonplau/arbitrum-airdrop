import { graphql } from "~/lib/gql/gql";

const query = graphql(`
  query getTokenBalances($address: Bytes, $limit: Int, $skip: Int) {
    tokenBalances(
      where: { address_contains: $address }
      first: $limit
      skip: $skip
      orderBy: balance
      orderDirection: desc
    ) {
      address
      balance
    }
  }
`);

export default query;
