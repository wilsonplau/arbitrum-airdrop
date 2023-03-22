/*
  Warnings:

  - You are about to drop the column `balance` on the `TokenBalance` table. All the data in the column will be lost.
  - Added the required column `balanceNumber` to the `TokenBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceString` to the `TokenBalance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TokenBalance" DROP COLUMN "balance",
ADD COLUMN     "balanceNumber" BIGINT NOT NULL,
ADD COLUMN     "balanceString" TEXT NOT NULL;
