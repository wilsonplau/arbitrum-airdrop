import { NextApiRequest, NextApiResponse } from "next";
import ClaimRepository from "~/models/ClaimRepository";
import { ErrorResponse, GetClaimsRequest, GetClaimsResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetClaimsResponse | ErrorResponse>
) {
  if (req.method != "GET") return res.status(405).end();
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
    let claims;
    if (address) {
      console.log({ address });
      claims = await ClaimRepository.findMany({ address }, cursor, limit);
    } else claims = await ClaimRepository.getMany(cursor, limit);
    res.status(200).json({ claims });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
