import React from "react";
import { NextPage } from "next";

import UserClaimsTable from "~/containers/UserClaimsTable";

const IndexPage: NextPage = () => {
  return (
    <main className="flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-screen-xl">
        <UserClaimsTable />
      </div>
    </main>
  );
};

export default IndexPage;
