import { NextApiRequest, NextApiResponse } from "next";
import EventRepository from "~/models/EventRepository";
import TokenIndexingService, {
  TOKEN_TRANSFER_EVENT_HASH,
  TOKEN_TRANSFER_EVENT_INTERFACE,
} from "~/services/TokenIndexingService";
import TokenProcessingService from "~/services/TokenProcessingService";
import { JobResponse } from "~/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobResponse>
) {
  // const { authorization } = req.headers;
  // if (authorization !== `Bearer ${process.env.CRON_KEY}`)
  //   return res.status(401).json({ success: false });

  await TokenProcessingService.processTransferEventLogs();
  res.status(200).json({ success: true });
}
