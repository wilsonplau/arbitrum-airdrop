import React from "react";
import { useQuery } from "react-query";
import StatsCard from "~/components/StatsCard";
import apiClient from "~/lib/apiClient";

const TokenSupply: React.FC = () => {
  const { data } = useQuery(
    ["token", "supply"],
    () => apiClient.getTokenSupply(),
    { initialData: 0 }
  );
  return (
    <StatsCard
      heading="Total Token Supply"
      stat={data?.toLocaleString("en-US") || ""}
      link="https://arbiscan.io/token/0x912CE59144191C1204E64559FE8253a0e49E6548"
    />
  );
};

export default TokenSupply;
