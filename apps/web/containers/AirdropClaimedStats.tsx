import React from "react";

import StatsCard from "~/components/StatsCard";
import useAirdropStats from "~/hooks/useAirdropStats";
import { formatTokenAmount, formatNumber, convertTokenAmount } from "~/utils";

const AirdropClaimedStats: React.FC = () => {
  const { data } = useAirdropStats();

  const percentageAddressesClaimed = data
    ? 100 * (data.totalClaimedRecipients / data.totalRecipients)
    : 0;
  const percentageTokensClaimed = data
    ? 100 *
      (convertTokenAmount(data.totalClaimedAmount) /
        convertTokenAmount(data.totalAmount))
    : 0;

  return (
    <>
      <StatsCard
        heading="Number of Addresses Claimed"
        stat={data ? formatNumber(Number(data.totalRecipients)) : "-"}
      />
      <StatsCard
        heading="Number of Tokens Claimed"
        stat={data ? formatTokenAmount(data.totalClaimedAmount) : "-"}
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

export default AirdropClaimedStats;
