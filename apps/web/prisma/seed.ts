import { PrismaClient } from "@prisma/client";
import { ARBITRUM_TOKEN_DECIMALS } from "~/constants";
import { getAirdropRecipients } from "~/data";

const prisma = new PrismaClient();

async function main() {
  const STARTING_BLOCK = 70506643;
  const ENDING_BLOCK = 70552861;
  const recipients = await getAirdropRecipients(STARTING_BLOCK, ENDING_BLOCK);
  const data = Object.entries(recipients).map(([address, amount]) => ({
    address,
    amountString: amount,
    amountNumber: Number(
      BigInt(amount) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS)
    ),
  }));
  await prisma.claim.createMany({ data, skipDuplicates: true });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
