import {
  ARBITRUM_USER_AIRDROP_ADDRESS,
  CAN_CLAIM_EVENT_HASH,
  CAN_CLAIM_EVENT_INTERFACE,
  HAS_CLAIMED_EVENT_HASH,
  HAS_CLAIMED_EVENT_INTERFACE,
} from "~/constants";
import alchemy, { getLogsParallel } from "~/lib/alchemy";
import EventRepository from "~/models/EventRepository";

const CONTRACT_DEPLOY_BLOCK = 70506643;

export default class UserAirdropIndexingService {
  public static async indexCanClaimEvents() {
    const latestLog = await EventRepository.findLatest({
      eventHash: `0x${CAN_CLAIM_EVENT_HASH}`,
    });
    const fromBlock = latestLog?.blockNumber || CONTRACT_DEPLOY_BLOCK;
    const toBlock = await alchemy.core.getBlockNumber();
    const logs = await getLogsParallel(
      {
        address: ARBITRUM_USER_AIRDROP_ADDRESS,
        topics: [`0x${CAN_CLAIM_EVENT_HASH}`],
      },
      fromBlock,
      toBlock
    );
    await EventRepository.createEventsFromLogs(logs, CAN_CLAIM_EVENT_INTERFACE);
  }
  public static async indexHasClaimedEvents() {
    const latestLog = await EventRepository.findLatest({
      eventHash: `0x${HAS_CLAIMED_EVENT_HASH}`,
    });
    const fromBlock = latestLog?.blockNumber || CONTRACT_DEPLOY_BLOCK;
    const toBlock = await alchemy.core.getBlockNumber();
    const logs = await getLogsParallel(
      {
        address: ARBITRUM_USER_AIRDROP_ADDRESS,
        topics: [`0x${HAS_CLAIMED_EVENT_HASH}`],
      },
      fromBlock,
      toBlock
    );
    await EventRepository.createEventsFromLogs(
      logs,
      HAS_CLAIMED_EVENT_INTERFACE
    );
  }
}
