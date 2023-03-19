import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

interface UserClaimsDistributionBarChartProps {
  data: { name: string; count: number; sum: number }[];
}

const UserClaimsDistributionBarChart: React.FC<
  UserClaimsDistributionBarChartProps
> = ({ data }) => {
  const [innerWidth, setInnerWidth] = useState<number>(0);

  let [sum, count] = [0, 0];
  for (const { count: c, sum: s } of data) {
    sum += s;
    count += c;
  }
  const average = Math.round(sum / count);

  const CustomTooltip: React.FC = ({ payload }: any) => {
    return (
      <div className="w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        {payload && payload.length ? (
          <p>{`Out of 625,143 addresses, ${payload[0].value} qualified for an airdrop of ${payload[0].payload.name} tokens.`}</p>
        ) : (
          <p>
            On average, each eligible address qualified for {average} tokens.
          </p>
        )}
      </div>
    );
  };

  return (
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
  );
};

export default UserClaimsDistributionBarChart;
