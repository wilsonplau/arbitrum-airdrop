import { NextApiRequest, NextApiResponse } from "next";
import ClaimRepository from "~/models/ClaimRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(405).end();
  const offset = req.query.offset
    ? parseInt(req.query.offset as string)
    : undefined;
  const limit = req.query.limit
    ? parseInt(req.query.limit as string)
    : undefined;
  const address = req.query.address as string;
  try {
    let claims;
    if (address)
      claims = await ClaimRepository.findManyByAddress(address, offset, limit);
    else claims = await ClaimRepository.getMany(offset, limit);
    res.status(200).json({ claims });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
