import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useUserAirdropClaims from "~/hooks/useUserAirdropClaims";

const UserClaimsTable: React.FC = () => {
  const {
    query,
    setQuery,
    claims,
    pageNumber,
    pageSize,
    isFirstPage,
    isLastPage,
    handleNext,
    handlePrev,
  } = useUserAirdropClaims();
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-8">
      <div>
        <h1 className="text-2xl text-white">Airdrop List</h1>
        <h2 className="text-lg text-gray-400">
          Which addresses qualified for the airdrop and for how many tokens?
        </h2>
      </div>
      <input
        type="text"
        value={query}
        placeholder="Search for an address (0x000...)"
        className="w-full rounded bg-gray-900 p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full table-fixed divide-y divide-gray-700 border-b border-gray-700">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                    Address
                  </th>
                  <th className="w-32 py-3.5 px-3 text-center text-sm font-semibold text-white">
                    Amount
                  </th>
                  <th className="w-32 py-3.5 px-3 text-center text-sm font-semibold text-white">
                    Claimed?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {claims.map((claim) => (
                  <tr key={claim.address}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                      {claim.address}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm text-white">
                      {claim.amountNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">
              Showing results{" "}
              <span className="font-medium">{pageNumber * pageSize + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {pageNumber * pageSize + claims.length}
              </span>
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFirstPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 enabled:hover:bg-gray-800 disabled:ring-gray-500"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isLastPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 enabled:hover:bg-gray-800 disabled:ring-gray-500"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserClaimsTable;
