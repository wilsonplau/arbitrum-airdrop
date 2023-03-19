import { NextApiRequest, NextApiResponse } from "next";
import ClaimRepository from "~/models/ClaimRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(405).end();
  try {
    const stats = await ClaimRepository.getStats();
    res.status(200).json(stats);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
