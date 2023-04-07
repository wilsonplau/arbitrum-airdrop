import React from "react";
import StatsCard from "~/components/StatsCard";
import { formatNumber } from "~/utils";
import useAirdropStats from "~/hooks/useAirdropStats";

const AirdropStats: React.FC = () => {
  const { data } = useAirdropStats();
  return (
    <StatsCard
      heading="Number of Eligible Addresses"
      stat={data ? formatNumber(Number(data.totalRecipients)) : "-"}
    />
  );
};

export default AirdropStats;
