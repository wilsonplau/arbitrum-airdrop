import { useQuery } from "@tanstack/react-query";
import { AirdropStats } from "~/lib/gql/graphql";
import graphQLClient from "~/lib/graphQLClient";

interface UseAirdropStatsInterface {
  data: AirdropStats | null;
}

export default function useAirdropStats(): UseAirdropStatsInterface {
  const { data } = useQuery({
    queryKey: ["airdrop", "stats"],
    queryFn: graphQLClient.getAirdropStats,
    initialData: null,
  });
  console.log({ data });
  return { data };
}
