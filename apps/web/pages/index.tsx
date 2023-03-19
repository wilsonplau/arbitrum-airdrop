import React from "react";
import { NextPage } from "next";

import UserClaimsTable from "~/containers/UserClaimsTable";
import UserClaimsDistribution from "~/containers/UserClaimsDistribution";

const IndexPage: NextPage = () => {
  return (
    <main className="flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-screen-xl flex-col gap-8 py-24">
        <div className="grid grid-cols-2 items-start gap-8">
          <h1 className="col-span-2 text-5xl font-semibold text-white">
            User Airdrop
          </h1>
          <UserClaimsTable />
          <UserClaimsDistribution />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
