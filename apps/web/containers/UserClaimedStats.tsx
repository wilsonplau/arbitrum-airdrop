import React from "react";
import { useQuery } from "react-query";
import StatsCard from "~/components/StatsCard";
import apiClient from "~/lib/apiClient";
import { formatTokenAmount, formatNumber } from "~/utils";

const UserClaimedStats: React.FC = () => {
  const { data: stats } = useQuery(["claimed", "stats"], () =>
    apiClient.getClaimedStats()
  );

  return (
    <>
      <StatsCard
        heading="Number of Addresses Claimed"
        stat={stats ? formatNumber(stats.count) : "0"}
      />
      <StatsCard
        heading="Number of Tokens Claimed"
        stat={stats ? formatTokenAmount(stats.sum) : "0"}
      />
    </>
  );
};

export default UserClaimedStats;
