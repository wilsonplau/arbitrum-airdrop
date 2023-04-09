import { useQuery } from "@tanstack/react-query";
import { AirdropClaimStat } from "~/lib/gql/graphql";
import graphQLClient from "~/lib/graphQLClient";

interface UseAidropHistoryInterface {
  data: AirdropClaimStat[];
}

export default function useAirdropHistory(): UseAidropHistoryInterface {
  const { data } = useQuery({
    queryKey: ["airdrop", "history"],
    queryFn: graphQLClient.getAirdropHistory,
    initialData: [],
  });
  return { data };
}
