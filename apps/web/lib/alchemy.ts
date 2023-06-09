import { Network, Alchemy, Filter, Log, BlockTag } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY_ARB_MAINNET,
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(settings);
const BLOCK_INCREMENT = 2000;

export async function getLogsParallel(
  filter: Pick<Filter, "address" | "topics">,
  fromBlock: number,
  toBlock: number,
  batchSize: number = 10
): Promise<Log[]> {
  const output: Log[] = [];
  let currentBlock = fromBlock;
  const requests = [];
  for (let i = 0; i < batchSize; i++) {
    if (currentBlock > toBlock) break;
    const request = alchemy.core.getLogs({
      ...filter,
      fromBlock: currentBlock,
      toBlock: Math.min(toBlock, currentBlock + BLOCK_INCREMENT - 1),
    });
    currentBlock += BLOCK_INCREMENT;
    requests.push(request);
  }
  const results = await Promise.all(requests);
  for (const result of results) output.push(...result);
  return output;
}

export async function getLogDangerously(
  filter: Pick<Filter, "address" | "topics">,
  fromBlock: number,
  toBlock: BlockTag
) {
  try {
    return await alchemy.core.getLogs({
      ...filter,
      fromBlock,
      toBlock,
    });
  } catch (e: any) {
    const message = JSON.parse(e.body).error.message;
    if (message.includes("this block range should work: [")) {
      const idxStart = message.indexOf("[");
      const idxEnd = message.indexOf("]");
      const [fromBlockRec, toBlockRec] = message
        .slice(idxStart + 1, idxEnd)
        .split(",")
        .map((x: string) => parseInt(x.trim(), 16));
      return await alchemy.core.getLogs({
        ...filter,
        fromBlock: fromBlockRec,
        toBlock: toBlockRec,
      });
    } else {
      return await alchemy.core.getLogs({
        ...filter,
        fromBlock,
        toBlock: fromBlock + BLOCK_INCREMENT - 1,
      });
    }
  }
}

export async function getLogsDangerously(
  filter: Pick<Filter, "address" | "topics">,
  fromBlock: number,
  toBlock: number
) {
  const output: Log[] = [];
  let currentBlock = fromBlock;
  while (currentBlock < toBlock) {
    const logs = await getLogDangerously(filter, currentBlock, toBlock);
    output.push(...logs);
    if (logs.length === 0) break;
    currentBlock = logs[logs.length - 1].blockNumber + 1;
  }
  return output;
}

export default alchemy;
