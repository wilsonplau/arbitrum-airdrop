import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import apiClient from "~/lib/apiClient";
import { ARBITRUM_TOKEN_DECIMALS } from "~/constants";
import useAirdropDistribution from "~/hooks/useAirdropDistribution";
import { convertTokenAmount, formatNumber, formatTokenAmount } from "~/utils";
import useAirdropStats from "~/hooks/useAirdropStats";

const AirdropDistribution: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const { data: distributionData } = useAirdropDistribution();
  const data = distributionData
    .map(({ amount, totalRecipients }) => ({
      amount: convertTokenAmount(amount),
      count: Number(totalRecipients),
    }))
    .sort((a, b) => a.amount - b.amount);

  const { data: airdropData } = useAirdropStats();
  const totalTokens = convertTokenAmount(airdropData?.totalAmount);
  const airdropCount = airdropData?.totalRecipients;
  const average = convertTokenAmount(airdropData?.totalAmount) / airdropCount;

  const CustomTooltip: React.FC = ({ payload }: any) => {
    return (
      <div className="w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        {payload && payload.length ? (
          <p>{`Out of ${formatNumber(airdropCount)} addresses, 
          ${payload[0].value.toLocaleString(
            "en-US"
          )} qualified for an airdrop of ${payload[0].payload.amount.toLocaleString(
            "en-US"
          )} tokens.`}</p>
        ) : (
          <p>
            On average, each eligible address qualified for{" "}
            {formatNumber(average)} tokens.
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
          How were the {formatNumber(totalTokens)} tokens distributed between
          addresses?
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

export default AirdropDistribution;
