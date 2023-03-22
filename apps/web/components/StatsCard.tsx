import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface StatsCardProps {
  heading: string;
  stat: string;
  link?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ heading, stat, link }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div className="flex flex-row justify-between">
        <h3 className="text-sm font-semibold uppercase text-white">
          {heading}
        </h3>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ArrowTopRightOnSquareIcon className="w-6 text-white" />
          </a>
        ) : null}
      </div>
      <span className="text-5xl text-white">{stat}</span>
    </div>
  );
};

export default StatsCard;
