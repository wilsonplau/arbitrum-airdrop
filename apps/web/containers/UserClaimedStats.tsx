import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "~/components/StatsCard";
import apiClient from "~/lib/apiClient";
import { formatTokenAmount, formatNumber, convertTokenAmount } from "~/utils";

const UserClaimedStats: React.FC = () => {
  const { data: claimedStats } = useQuery(
    ["claimed", "stats"],
    apiClient.getClaimedStats
  );
  const { data: claimStats } = useQuery(
    ["claim", "stats"],
    apiClient.getClaimStats
  );

  const percentageAddressesClaimed =
    claimedStats && claimStats
      ? 100 * (claimedStats.count / claimStats.count)
      : 0;
  const percentageTokensClaimed =
    claimedStats && claimStats
      ? 100 *
        (convertTokenAmount(claimedStats.sum) /
          convertTokenAmount(claimStats.sum))
      : 0;

  return (
    <>
      <StatsCard
        heading="Number of Addresses Claimed"
        stat={claimedStats ? formatNumber(claimedStats.count) : "-"}
      />
      <StatsCard
        heading="Number of Tokens Claimed"
        stat={claimedStats ? formatTokenAmount(claimedStats.sum) : "-"}
      />
      <StatsCard
        heading="Percentage of Addresses Claimed"
        stat={`${formatNumber(percentageAddressesClaimed)}%`}
      />
      <StatsCard
        heading="Percentage of Tokens Claimed"
        stat={`${formatNumber(percentageTokensClaimed)}%`}
      />
    </>
  );
};

export default UserClaimedStats;
