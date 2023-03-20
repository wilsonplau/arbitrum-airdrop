import { Network, Alchemy, Filter, Log } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY_ARB_MAINNET,
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getLogsParallel(
  filter: Pick<Filter, "address" | "topics">,
  fromBlock: number,
  toBlock: number,
  batchSize: number = 25
): Promise<Log[]> {
  const BLOCK_INCREMENT = 2000;
  const output: Log[] = [];
  let currentBlock = fromBlock;
  while (currentBlock < toBlock) {
    const requests = [];
    for (let i = 0; i < batchSize; i++) {
      const request = alchemy.core.getLogs({
        ...filter,
        fromBlock: currentBlock,
        toBlock: Math.min(toBlock, currentBlock + BLOCK_INCREMENT - 1),
      });
      requests.push(request);
      currentBlock += BLOCK_INCREMENT;
      if (currentBlock >= toBlock) break;
    }
    const results = await Promise.all(requests);
    for (const result of results) output.push(...result);
  }
  return output;
}

export async function getLogsSerial(
  filter: Pick<Filter, "address" | "topics">,
  fromBlock: number,
  toBlock: number
) {
  const output: Log[] = [];
  let currentBlock = fromBlock;
  while (currentBlock < toBlock) {
    try {
      const logs = await alchemy.core.getLogs({
        ...filter,
        fromBlock: currentBlock,
        toBlock: toBlock,
      });
      output.push(...logs);
    } catch (e: any) {
      const message = JSON.parse(e.body).error.message;
      if (message.contains("this block range should work: [")) {
        const idxStart = message.indexOf("[");
        const idxEnd = message.indexOf("]");
        const [fromBlockRec, toBlockRec] = message
          .slice(idxStart + 1, idxEnd)
          .split(",")
          .map((x: string) => parseInt(x.trim(), 16));
        const logs = await alchemy.core.getLogs({
          ...filter,
          fromBlock: fromBlockRec,
          toBlock: toBlockRec,
        });
        output.push(...logs);
        currentBlock = toBlockRec + 1;
      } else {
        break;
      }
    }
    return output;
  }
}

export default alchemy;
