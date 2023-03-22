import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

import alchemy from "~/lib/alchemy";
import { ARBITRUM_TOKEN_ADDRESS, ARBITRUM_TOKEN_DECIMALS } from "~/constants";
import { ErrorResponse, GetTokenSupplyResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTokenSupplyResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const totalSupplyInterface = new ethers.Interface([
      "function totalSupply() external view returns (uint256)",
    ]);
    const totalSupplyData =
      totalSupplyInterface.encodeFunctionData("totalSupply");
    const supplyHexString = await alchemy.core.call({
      to: ARBITRUM_TOKEN_ADDRESS,
      data: totalSupplyData,
    });
    const supply = Number(
      BigInt(supplyHexString) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS)
    );
    res.status(200).json({ supply });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
