import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import apiClient from "~/lib/apiClient";

const UserClaimsTable: React.FC = () => {
  const PAGE_SIZE = 10;

  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors.length == 0 ? undefined : cursors[cursors.length - 1];

  const [address, setAddress] = useState<string>("");
  const [addressQuery, setAddressQuery] = useState<string>("");

  useEffect(() => {
    setAddress(addressQuery);
    setCursors([]);
  }, [addressQuery]);

  const { data: claims = [] } = useQuery(
    ["claims", { address, cursor }],
    () => apiClient.getClaims(address, cursor, PAGE_SIZE),
    { keepPreviousData: true }
  );
  const handleNext = () => {
    setCursors((cursors) => {
      const next = [...cursors, claims[claims.length - 1].address];
      return next;
    });
  };
  const handlePrev = () => {
    setCursors((cursors) => {
      const prev = [...cursors];
      prev.pop();
      return prev;
    });
  };

  const { data: stats } = useQuery(["claimStats"], () =>
    apiClient.getClaimStats()
  );

  return (
    <div className="bg-gray-800 py-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              $ARB Airdrop List
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Check if you&apos;ve qualified for an airdrop.
            </p>
          </div>
          <div>
            <input
              type="text"
              value={addressQuery}
              placeholder="Search for an address (0x000...)"
              className="w-full rounded bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              onChange={(e) => setAddressQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full table-fixed divide-y divide-gray-700">
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
      </div>
      <div className="flex items-center justify-between border-t border-gray-800 p-4 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">
              Showing{" "}
              <span className="font-medium">{cursors.length * 10 + 1}</span> to{" "}
              <span className="font-medium">
                {cursors.length * 10 + PAGE_SIZE}
              </span>{" "}
              of <span className="font-medium">{stats?.count}</span> claims
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
                disabled={cursors.length == 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 enabled:hover:bg-gray-800 disabled:ring-gray-500"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
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
