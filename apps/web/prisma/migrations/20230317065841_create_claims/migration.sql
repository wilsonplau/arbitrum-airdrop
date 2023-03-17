-- CreateTable
CREATE TABLE "Claim" (
    "address" TEXT NOT NULL,
    "amountString" TEXT NOT NULL,
    "amountNumber" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("address")
);
