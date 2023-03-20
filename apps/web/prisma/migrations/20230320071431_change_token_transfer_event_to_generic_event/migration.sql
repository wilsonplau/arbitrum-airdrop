/*
  Warnings:

  - You are about to drop the `TokenTransferEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TokenTransferEvent";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "topics" TEXT[],
    "eventHash" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "blockNumberNumber" INTEGER NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" TEXT NOT NULL,
    "transactionIndexNumber" INTEGER NOT NULL,
    "blockHash" TEXT NOT NULL,
    "logIndex" TEXT NOT NULL,
    "logIndexNumber" INTEGER NOT NULL,
    "removed" BOOLEAN NOT NULL,
    "description" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
