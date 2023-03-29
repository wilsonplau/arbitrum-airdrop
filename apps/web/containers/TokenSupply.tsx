import React from "react";
import StatsCard from "~/components/StatsCard";
import { ARBITRUM_TOKEN_SUPPLY } from "~/constants";

const TokenSupply: React.FC = () => {
  return (
    <StatsCard
      heading="Total Token Supply"
      stat={ARBITRUM_TOKEN_SUPPLY.toLocaleString("en-US")}
      link="https://arbiscan.io/token/0x912CE59144191C1204E64559FE8253a0e49E6548"
    />
  );
};

export default TokenSupply;
