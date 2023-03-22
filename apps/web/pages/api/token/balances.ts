import { NextApiRequest, NextApiResponse } from "next";
import TokenBalanceRepository from "~/models/TokenBalanceRepository";
import { ErrorResponse, GetTokenBalancesResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTokenBalancesResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const address = Array.isArray(req.query.address)
    ? req.query.address.join(" ")
    : req.query.address;
  const cursor = Array.isArray(req.query.cursor)
    ? req.query.cursor[0]
    : req.query.cursor;
  const limit = Array.isArray(req.query.limit)
    ? parseInt(req.query.limit[0])
    : req.query.limit
    ? parseInt(req.query.limit)
    : undefined;

  try {
    let balances;
    if (address) {
      balances = await TokenBalanceRepository.findMany(
        { address },
        cursor,
        limit
      );
    } else balances = await TokenBalanceRepository.getMany(cursor, limit);
    const count = await TokenBalanceRepository.count();
    res.status(200).json({ balances, count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
