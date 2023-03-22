-- CreateTable
CREATE TABLE "TokenBalance" (
    "address" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "balance" TEXT NOT NULL,

    CONSTRAINT "TokenBalance_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "_EventToTokenBalance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTokenBalance_AB_unique" ON "_EventToTokenBalance"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTokenBalance_B_index" ON "_EventToTokenBalance"("B");

-- AddForeignKey
ALTER TABLE "_EventToTokenBalance" ADD CONSTRAINT "_EventToTokenBalance_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTokenBalance" ADD CONSTRAINT "_EventToTokenBalance_B_fkey" FOREIGN KEY ("B") REFERENCES "TokenBalance"("address") ON DELETE CASCADE ON UPDATE CASCADE;
