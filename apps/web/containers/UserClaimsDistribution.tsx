import React, { useState } from "react";
import { useQuery } from "react-query";
import apiClient from "~/lib/apiClient";
import UserClaimsDistributionBarChart from "./UserClaimsDistributionBarChart";

const UserClaimsDistribution: React.FC = () => {
  const { data: distributionData } = useQuery(["userClaimsDistribution"], () =>
    apiClient.getClaimsDistribution()
  );
  if (!distributionData) return <div>Loading...</div>;

  const data = Object.keys(distributionData.count).map((amountNumber) => {
    return {
      name: amountNumber,
      count: distributionData.count[amountNumber],
      sum: distributionData.sum[amountNumber],
    };
  });
  const totalTokens = data.reduce((acc, { sum }) => acc + sum, 0);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <h1 className="text-2xl text-white">Airdrop Distribution</h1>
        <h2 className="text-lg text-gray-400">
          How were the {totalTokens.toLocaleString("en-US")} tokens distributed
          between addresses?
        </h2>
      </div>
      <UserClaimsDistributionBarChart data={data} />
    </div>
  );
};

export default UserClaimsDistribution;
