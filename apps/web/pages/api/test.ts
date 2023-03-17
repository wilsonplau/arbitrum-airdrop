import { NextApiRequest, NextApiResponse } from "next";
import { getAirdropRecipients } from "~/data";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const STARTING_BLOCK = 70506643;
  const ENDING_BLOCK = 70507643; // 70552861
  const recipients = await getAirdropRecipients(STARTING_BLOCK, ENDING_BLOCK);
  res.status(200).json({ recipients });
}
