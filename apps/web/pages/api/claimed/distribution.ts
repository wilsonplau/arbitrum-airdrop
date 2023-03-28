import { NextApiRequest, NextApiResponse } from "next";
import ClaimRepository from "~/models/ClaimRepository";
import { ErrorResponse, GetClaimedDistributionResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetClaimedDistributionResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const data = await ClaimRepository.getClaimedDistribution();
    res.status(200).json({ data });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
