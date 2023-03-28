import React from "react";
import { useQuery } from "react-query";
import StatsCard from "~/components/StatsCard";
import apiClient from "~/lib/apiClient";
import { formatNumber } from "~/utils";

const UserClaimsStats: React.FC = () => {
  const { data: claimStats } = useQuery(["claim", "stats"], () =>
    apiClient.getClaimStats()
  );

  return (
    <StatsCard
      heading="Number of Eligible Addresses"
      stat={claimStats ? formatNumber(claimStats.count) : "-"}
    />
  );
};

export default UserClaimsStats;
