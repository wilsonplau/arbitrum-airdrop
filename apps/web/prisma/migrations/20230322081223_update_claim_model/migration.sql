/*
  Warnings:

  - You are about to alter the column `amountNumber` on the `Claim` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "claimedAmountNumber" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "claimedAmountString" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "hasClaimed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "amountNumber" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "_ClaimToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClaimToEvent_AB_unique" ON "_ClaimToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClaimToEvent_B_index" ON "_ClaimToEvent"("B");

-- AddForeignKey
ALTER TABLE "_ClaimToEvent" ADD CONSTRAINT "_ClaimToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Claim"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClaimToEvent" ADD CONSTRAINT "_ClaimToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
