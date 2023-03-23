import {
  ARBITRUM_TOKEN_ADDRESS,
  TRANSFER_EVENT_HASH,
  TRANSFER_EVENT_INTERFACE,
} from "~/constants";
import alchemy, { getLogDangerously } from "~/lib/alchemy";
import EventRepository from "~/models/EventRepository";

const CONTRACT_DEPLOY_BLOCK = 70397784;

export default class TokenIndexingService {
  public static async indexTransferEvents() {
    const latestLog = await EventRepository.findLatest({
      eventHash: TRANSFER_EVENT_HASH,
    });
    const fromBlock = latestLog?.blockNumber || CONTRACT_DEPLOY_BLOCK;
    const toBlock = await alchemy.core.getBlockNumber();
    const logs = await getLogDangerously(
      {
        address: ARBITRUM_TOKEN_ADDRESS,
        topics: [`0x${TRANSFER_EVENT_HASH}`],
      },
      fromBlock,
      toBlock
    );
    await EventRepository.createEventsFromLogs(logs, TRANSFER_EVENT_INTERFACE);
  }
}
