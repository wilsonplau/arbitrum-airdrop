import { NextApiRequest, NextApiResponse } from "next";
import TokenBalanceRepository from "~/models/TokenBalanceRepository";
import TokenProcessingService from "~/services/TokenProcessingService";
import { JobResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobResponse>
) {
  // const { authorization } = req.headers;
  // if (authorization !== `Bearer ${process.env.CRON_KEY}`)
  //   return res.status(401).json({ success: false });

  try {
    await TokenProcessingService.processTransferEvents();
    //await TokenBalanceRepository.refresh();
    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
}
