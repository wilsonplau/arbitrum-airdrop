import { useQuery } from "@tanstack/react-query";
import { AirdropDistributionStat } from "~/lib/gql/graphql";
import graphQLClient from "~/lib/graphQLClient";

interface UseAidropDistributionInterface {
  data: AirdropDistributionStat[];
}

export default function useAirdropDistribution(): UseAidropDistributionInterface {
  const { data } = useQuery({
    queryKey: ["airdrop", "distribution"],
    queryFn: graphQLClient.getAirdropDistribution,
    initialData: [],
  });
  return { data };
}
