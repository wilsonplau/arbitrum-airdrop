import { NextApiRequest, NextApiResponse } from "next";
import TokenIndexingService from "~/services/TokenIndexingService";
import { JobResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobResponse>
) {
  const key = req.query.key;
  if (key !== process.env.CRON_KEY)
    return res.status(401).json({ success: false });

  try {
    await TokenIndexingService.indexTransferEvents();
    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
}
