import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import apiClient from "~/lib/apiClient";
import { convertTokenAmount } from "~/utils";

const UserClaimedChart: React.FC = () => {
  const [dataKey, setDataKey] = useState<"sum" | "count">("count");
  const { data: distributionData } = useQuery(["claimed", "distribution"], () =>
    apiClient.getClaimedDistribution()
  );

  if (!distributionData) return <div>Loading...</div>;
  const data = distributionData.data.map(({ blockNumber, sum, count }) => ({
    blockNumber,
    sum: convertTokenAmount(sum),
    count,
  }));

  const CustomTooltip: React.FC = ({ payload }: any) => {
    if (!payload || !payload.length) return null;
    const { blockNumber, sum, count } = payload[0].payload;
    return (
      <div className="relative w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        By Block Number {blockNumber.toLocaleString("en-US")},{" "}
        {dataKey === "count"
          ? `${count.toLocaleString("en-US")} addresses had claimed the
        airdrop.`
          : `${sum.toLocaleString("en-US")} tokens had been claimed.`}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-white">Airdrop Claims</h1>
          <div className="flex flex-row">
            <button
              className="rounded border-gray-300 py-1 px-2 text-sm text-white disabled:bg-gray-900"
              disabled={dataKey == "count"}
              onClick={() => setDataKey("count")}
            >
              Users
            </button>
            <button
              className="rounded border-gray-300 py-1 px-2 text-sm text-white disabled:bg-gray-900"
              disabled={dataKey == "sum"}
              onClick={() => setDataKey("sum")}
            >
              Tokens
            </button>
          </div>
        </div>
        <h2 className="text-lg text-gray-400">
          {dataKey === "count"
            ? "How many addresses have claimed the airdrop so far?"
            : "How many tokens have been claimed in the airdrop so far?"}
        </h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis
              dataKey="blockNumber"
              stroke="white"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey={dataKey}
              stroke="white"
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
              tick={{ fontSize: 12 }}
            />
            <Line dataKey={dataKey} stroke="white" />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserClaimedChart;
