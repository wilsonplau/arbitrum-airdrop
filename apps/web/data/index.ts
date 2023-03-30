import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { utils } from "ethers";

import { ARBITRUM_USER_AIRDROP_ADDRESS } from "~/constants";
import alchemy from "~/lib/alchemy";

export async function getAirdropRecipients(fromBlock: number, toBlock: number) {
  const BLOCK_INCREMENT = 1000;
  const output: { [key: string]: string } = {};

  let currentBlock = fromBlock;
  while (currentBlock < toBlock) {
    const logs = await getCanClaimEventLogs(
      currentBlock,
      Math.min(toBlock, currentBlock + BLOCK_INCREMENT)
    );
    for (const log of logs) {
      const recipient = log.args[0];
      const amount = BigInt(log.args[1]).toString();
      output[recipient] = amount;
    }
    currentBlock = Math.min(toBlock, currentBlock + BLOCK_INCREMENT);
  }

  return output;
}

export async function getCanClaimEventLogs(
  fromBlock: number,
  toBlock: number
): Promise<utils.LogDescription[]> {
  const output: utils.LogDescription[] = [];
  try {
    const canClaimEventHash = toHex(
      keccak256(utf8ToBytes("CanClaim(address,uint256)"))
    );
    const canClaimEventInterface = new utils.Interface([
      "event CanClaim(address indexed recipient, uint256 amount)",
    ]);
    const logs = await alchemy.core.getLogs({
      address: ARBITRUM_USER_AIRDROP_ADDRESS,
      topics: [`0x${canClaimEventHash}`],
      fromBlock,
      toBlock,
    });
    for (const log of logs) {
      const logDescription = canClaimEventInterface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      if (logDescription) output.push(logDescription);
    }
    return output;
  } catch (e: any) {
    console.log(e.message);
    return [];
  }
}
