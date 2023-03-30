import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import {
  ARBITRUM_TOKEN_ADDRESS,
  ARBITRUM_USER_AIRDROP_ADDRESS,
} from "~/constants";
import { formatTokenAmount } from "~/utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { BigNumber } from "ethers";

const AirdropClaimForm: React.FC = () => {
  const { address, status } = useAccount();

  const { data } = useContractReads({
    contracts: [
      {
        address: ARBITRUM_USER_AIRDROP_ADDRESS,
        abi: ["function claimableTokens(address) view returns (uint256)"],
        functionName: "claimableTokens",
        args: [address],
      },
      {
        address: ARBITRUM_TOKEN_ADDRESS,
        abi: ["function balanceOf(address) view returns (uint256)"],
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: ARBITRUM_TOKEN_ADDRESS,
        abi: ["function delegates(address) view returns (address)"],
        functionName: "delegates",
        args: [address],
      },
    ],
  });
  const claimAmount = data?.[0] as BigNumber;
  const arbBalance = data?.[1] as BigNumber;
  const delegate = data?.[2] as string;

  const { config, error } = usePrepareContractWrite({
    address: ARBITRUM_USER_AIRDROP_ADDRESS,
    abi: ["function claim()"],
    functionName: "claim",
    chainId: 42161,
  });
  const { write } = useContractWrite(config);

  return (
    <div className="flex w-full items-start justify-center rounded-lg bg-gray-800">
      {status === "connected" ? (
        <div className="flex w-full flex-col p-8">
          <div className="flex flex-row justify-between">
            <h3 className="text-sm font-semibold uppercase text-white">
              YOUR HOLDINGS
            </h3>
            <ConnectButton />
          </div>
          <div className="grid grid-cols-5">
            <div className="flex flex-col gap-2">
              <dd className="text-5xl text-white">
                {formatTokenAmount(arbBalance?.toString() || "0")}
              </dd>
              <dt className="text-sm font-semibold uppercase text-white">
                $ARB Balance
              </dt>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <dd className="text-5xl text-white">
                {delegate ? (
                  <a
                    href={`https://arbiscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {delegate?.slice(0, 10)}...
                  </a>
                ) : (
                  "N/A"
                )}
              </dd>
              <dt className="flex flex-row gap-2 text-sm font-semibold uppercase text-white">
                Delegated to{" "}
                <ArrowTopRightOnSquareIcon className="w-4 text-white" />
              </dt>
            </div>
            <div className="flex flex-col gap-2">
              <dd className="text-5xl text-white">
                {formatTokenAmount(claimAmount?.toString() || "0")}
              </dd>
              <dt className="text-sm font-semibold uppercase text-white">
                Claimable $ARB
              </dt>
            </div>
            <div className="flex items-end justify-end">
              <button
                className="rounded-lg bg-gray-900 py-3 px-6 text-white disabled:opacity-50"
                onClick={write}
                disabled={!!error}
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-row items-center justify-between gap-4 p-8">
          <h2 className="text-lg text-gray-400">
            Check if you qualify for the $ARB Airdrop
          </h2>
          <ConnectButton />
        </div>
      )}
    </div>
  );
};

export default AirdropClaimForm;
