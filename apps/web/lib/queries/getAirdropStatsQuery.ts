import { graphql } from "~/lib/gql/gql";

const getAirdropStatsQuery = graphql(`
  query getAirdropStats {
    airdropStat(id: "total") {
      id
      totalAmount
      totalRecipients
      totalClaimedAmount
      totalClaimedRecipients
    }
  }
`);

export default getAirdropStatsQuery;
