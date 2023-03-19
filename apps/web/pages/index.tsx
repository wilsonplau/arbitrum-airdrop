import React from "react";
import { NextPage } from "next";

import UserClaimsTable from "~/containers/UserClaimsTable";
import UserClaimsDistribution from "~/containers/UserClaimsDistribution";

const IndexPage: NextPage = () => {
  return (
    <main className="flex items-center justify-center bg-gray-900">
      <div className="grid w-full max-w-screen-xl grid-cols-2 gap-4">
        <div className="col-span-2">
          <UserClaimsTable />
        </div>
        <UserClaimsDistribution />
      </div>
    </main>
  );
};

export default IndexPage;
