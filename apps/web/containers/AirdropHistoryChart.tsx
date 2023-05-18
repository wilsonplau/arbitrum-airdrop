import React, { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertTokenAmount } from "~/utils";
import useAirdropHistory from "~/hooks/useAirdropHistory";
import { format, fromUnixTime } from "date-fns";

const AirdropHistoryChart: React.FC = () => {
  const [dataKey, setDataKey] = useState<"totalAmount" | "totalRecipients">(
    "totalRecipients"
  );
  const { data: historyData } = useAirdropHistory();
  const data = historyData.map(
    ({ timestamp, totalAmount, totalRecipients }) => ({
      timestamp,
      totalAmount: convertTokenAmount(totalAmount),
      totalRecipients,
    })
  );

  const CustomTooltip: React.FC = ({ payload }: any) => {
    if (!payload || !payload.length) return null;
    const { timestamp, totalAmount, totalRecipients } = payload[0].payload;
    return (
      <div className="relative w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        By {format(fromUnixTime(timestamp), "yyyy-MM-dd")},{" "}
        {dataKey === "totalRecipients"
          ? `${totalRecipients.toLocaleString(
              "en-US"
            )} addresses had claimed the
        airdrop.`
          : `${totalAmount.toLocaleString("en-US")} tokens had been claimed.`}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-white">Airdrop Claims</h1>
          <div className="flex flex-row border-2 border-gray-700">
            <button
              className="rounded border-gray-300 py-1 px-2 text-sm text-white disabled:bg-gray-900"
              disabled={dataKey == "totalRecipients"}
              onClick={() => setDataKey("totalRecipients")}
            >
              Users
            </button>
            <button
              className="rounded border-gray-300 py-1 px-2 text-sm text-white disabled:bg-gray-900"
              disabled={dataKey == "totalAmount"}
              onClick={() => setDataKey("totalAmount")}
            >
              Tokens
            </button>
          </div>
        </div>
        <h2 className="text-lg text-gray-400">
          {dataKey === "totalRecipients"
            ? "How many addresses have claimed the airdrop so far?"
            : "How many tokens have been claimed in the airdrop so far?"}
        </h2>
      </div>
      {data ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                stroke="white"
                tick={{ fontSize: 12 }}
                tickFormatter={(timestamp) =>
                  format(fromUnixTime(timestamp), "yyyy-MM-dd")
                }
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
      ) : (
        <div className="h-[300px] w-full rounded bg-gray-700" />
      )}
    </div>
  );
};

export default AirdropHistoryChart;
