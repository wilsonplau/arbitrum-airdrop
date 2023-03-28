/*
  Warnings:

  - You are about to drop the `Claim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClaimToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToTokenBalance` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `blockNumber` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transactionIndex` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ClaimToEvent" DROP CONSTRAINT "_ClaimToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClaimToEvent" DROP CONSTRAINT "_ClaimToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTokenBalance" DROP CONSTRAINT "_EventToTokenBalance_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTokenBalance" DROP CONSTRAINT "_EventToTokenBalance_B_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "blockNumber" SET NOT NULL,
ALTER COLUMN "transactionIndex" SET NOT NULL;

-- DropTable
DROP TABLE "Claim";

-- DropTable
DROP TABLE "TokenBalance";

-- DropTable
DROP TABLE "_ClaimToEvent";

-- DropTable
DROP TABLE "_EventToTokenBalance";

-- CreateTable
CREATE TABLE "CanClaimEvent" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "blockHash" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" INTEGER NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "amount" DECIMAL(78,0) NOT NULL,

    CONSTRAINT "CanClaimEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasClaimedEvent" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "blockHash" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" INTEGER NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "amount" DECIMAL(78,0) NOT NULL,

    CONSTRAINT "HasClaimedEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferEvent" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "blockHash" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" INTEGER NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "value" DECIMAL(78,0) NOT NULL,

    CONSTRAINT "TransferEvent_pkey" PRIMARY KEY ("id")
);
