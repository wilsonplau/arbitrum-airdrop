-- CreateTable
CREATE TABLE "TokenTransferEvent" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "topics" TEXT[],
    "data" TEXT NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "logIndex" TEXT NOT NULL,
    "removed" BOOLEAN NOT NULL,

    CONSTRAINT "TokenTransferEvent_pkey" PRIMARY KEY ("id")
);
