import { graphql } from "~/lib/gql/gql";

const getAirdropDistributionQuery = graphql(`
  query getAirdropDistribution {
    airdropDistributionStats {
      id
      amount
      totalAmount
      totalRecipients
    }
  }
`);

export default getAirdropDistributionQuery;
