import { NextApiRequest, NextApiResponse } from "next";
import ClaimRepository from "~/models/ClaimRepository";
import UserAirdropProcessingService from "~/services/UserAirdropProcessingService";
import { JobResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobResponse>
) {
  // const { authorization } = req.headers;
  // if (authorization !== `Bearer ${process.env.CRON_KEY}`)
  //   return res.status(401).json({ success: false });

  try {
    await UserAirdropProcessingService.processCanClaimEvents();
    await ClaimRepository.refresh();
    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
}
