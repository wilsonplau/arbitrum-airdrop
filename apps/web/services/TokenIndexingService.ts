import { Log } from "alchemy-sdk";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { ethers } from "ethers";

import { ARBITRUM_TOKEN_ADDRESS } from "~/constants";
import alchemy, { getLogsParallel } from "~/lib/alchemy";

const CONTRACT_DEPLOY_BLOCK = 70397784;

export const TOKEN_TRANSFER_EVENT_HASH = toHex(
  keccak256(utf8ToBytes("Transfer(address,address,uint256)"))
);
export const TOKEN_TRANSFER_EVENT_INTERFACE = ethers.Interface.from([
  "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

export default class TokenIndexingService {
  public static async fetchTransferEventLogs(
    fromBlock: number = CONTRACT_DEPLOY_BLOCK,
    toBlock?: number
  ): Promise<Log[]> {
    const logs = await getLogsParallel(
      {
        address: ARBITRUM_TOKEN_ADDRESS,
        topics: [`0x${TOKEN_TRANSFER_EVENT_HASH}`],
      },
      Math.max(fromBlock, CONTRACT_DEPLOY_BLOCK),
      toBlock || (await alchemy.core.getBlockNumber())
    );
    return logs;
  }
}
