import { useQuery } from "@tanstack/react-query";
import { AirdropStat } from "~/lib/gql/graphql";
import graphQLClient from "~/lib/graphQLClient";

interface UseAirdropStatsInterface {
  data: AirdropStat | null;
}

export default function useAirdropStats(): UseAirdropStatsInterface {
  const { data } = useQuery({
    queryKey: ["airdrop", "stats"],
    queryFn: graphQLClient.getAirdropStats,
    initialData: null,
  });
  return { data };
}
