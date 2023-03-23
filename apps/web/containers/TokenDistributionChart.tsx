import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Sector } from "recharts";
import {
  ARBITRUM_TOKEN_SUPPLY,
  TOKEN_DISTRIBUTION,
  TOKEN_DISTRIBUTION_LINK,
} from "~/constants";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#FFF"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill="#FFF"
      />
    </g>
  );
};

const TokenDistributionChart: React.FC = () => {
  const data = TOKEN_DISTRIBUTION;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onPieEnter = (_, i: number) => setActiveIndex(i);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const CustomTooltip: React.FC = () => {
    const { name, amount } = data[activeIndex];
    return (
      <div className="w-[250px] bg-gray-900/90 p-4 text-white outline-none">
        <p>{name}</p>
        <p className="text-sm text-gray-400">
          {amount.toLocaleString("en-US")} tokens
        </p>
        <p className="text-sm text-gray-400">
          {((amount / ARBITRUM_TOKEN_SUPPLY) * 100).toFixed(2)}%
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-white">Airdrop Distribution</h1>
          <a
            href={TOKEN_DISTRIBUTION_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowTopRightOnSquareIcon className="w-6 text-white" />
          </a>
        </div>
        <h2 className="text-lg text-gray-400">
          How were the {ARBITRUM_TOKEN_SUPPLY.toLocaleString("en-US")} tokens
          initially allocated?
        </h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer onResize={(width) => setInnerWidth(width)}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              nameKey="name"
              dataKey="amount"
              innerRadius={80}
              outerRadius={120}
              onMouseEnter={onPieEnter}
              paddingAngle={3}
              fill="#6b7280"
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none", visibility: "visible" }}
              position={{ x: innerWidth - 250, y: 0 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TokenDistributionChart;
