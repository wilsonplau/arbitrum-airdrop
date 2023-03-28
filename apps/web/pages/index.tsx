import React from "react";
import { NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import UserClaimsTable from "~/containers/UserClaimsTable";
import UserClaimsDistribution from "~/containers/UserClaimsDistribution";
import TokenBalancesTable from "~/containers/TokenBalancesTable";
import TokenSupply from "~/containers/TokenSupply";
import TokenDistributionChart from "~/containers/TokenDistributionChart";
import UserClaimedStats from "~/containers/UserClaimedStats";
import UserClaimedChart from "~/containers/UserClaimedChart";
import apiClient from "~/lib/apiClient";

const IndexPage: NextPage = () => {
  return (
    <main className="flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-screen-xl flex-col gap-8 py-24">
        <div className="grid grid-cols-2 items-start gap-8">
          <h1 className="col-span-2 text-5xl font-semibold text-white">
            $ARB Token
          </h1>
          <div className="flex flex-col gap-4">
            <TokenSupply />
            <TokenDistributionChart />
          </div>
          <TokenBalancesTable />
        </div>
        <div className="grid grid-cols-2 items-start gap-8">
          <h1 className="col-span-2 text-5xl font-semibold text-white">
            User Airdrop
          </h1>
          <div className="flex flex-col gap-4">
            <UserClaimsDistribution />
            <UserClaimsTable />
          </div>
          <div className="flex flex-col gap-4">
            <UserClaimedChart />
            <UserClaimedStats />
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const queries = [
    queryClient.prefetchQuery(
      ["claimed", "distribution"],
      apiClient.getClaimedDistribution
    ),
    queryClient.prefetchQuery(["claimed", "stats"], apiClient.getClaimedStats),
    queryClient.prefetchQuery(
      ["claim", "distribution"],
      apiClient.getClaimedDistribution
    ),
    queryClient.prefetchQuery(["claim", "stats"], apiClient.getClaimedStats),
  ];
  await Promise.all(queries);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default IndexPage;
