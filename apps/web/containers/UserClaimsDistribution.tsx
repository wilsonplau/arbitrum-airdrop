import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "react-query";
import apiClient from "~/lib/apiClient";
import { ARBITRUM_TOKEN_DECIMALS } from "~/constants";

const UserClaimsDistribution: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const { data: distributionData } = useQuery(["userClaimsDistribution"], () =>
    apiClient.getClaimsDistribution()
  );
  if (!distributionData) return <div>Loading...</div>;

  const data = [];
  let [totalTokens, airdropCount] = [0, 0];
  for (const amount of Object.keys(distributionData.count)) {
    const amountNumber = Number(
      BigInt(amount) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS)
    );
    const sumNumber = Number(
      BigInt(distributionData.sum[amount]) /
        BigInt(10 ** ARBITRUM_TOKEN_DECIMALS)
    );
    totalTokens += sumNumber;
    airdropCount += Number(distributionData.count[amount]);
    data.push({
      name: amountNumber,
      count: Number(distributionData.count[amount]),
      sum: sumNumber,
    });
  }
  const average = Math.round(totalTokens / airdropCount);

  const CustomTooltip: React.FC = ({ payload }: any) => {
    return (
      <div className="w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        {payload && payload.length ? (
          <p>{`Out of ${airdropCount.toLocaleString("en-US")} addresses, 
          ${payload[0].value.toLocaleString(
            "en-US"
          )} qualified for an airdrop of ${payload[0].payload.name.toLocaleString(
            "en-US"
          )} tokens.`}</p>
        ) : (
          <p>
            On average, each eligible address qualified for{" "}
            {average.toLocaleString("en-US")} tokens.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <h1 className="text-2xl text-white">Airdrop Distribution</h1>
        <h2 className="text-lg text-gray-400">
          How were the {totalTokens.toLocaleString("en-US")} tokens distributed
          between addresses?
        </h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer onResize={(width) => setInnerWidth(width)}>
          <BarChart data={data}>
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none", visibility: "visible" }}
              position={{ x: innerWidth - 250, y: 0 }}
            />
            <Bar dataKey="count" fill="#6b7280" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserClaimsDistribution;
