/*
  Warnings:

  - You are about to drop the column `blockNumberNumber` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `logIndexNumber` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `transactionIndexNumber` on the `Event` table. All the data in the column will be lost.
  - The `blockNumber` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transactionIndex` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `logIndex` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "blockNumberNumber",
DROP COLUMN "logIndexNumber",
DROP COLUMN "transactionIndexNumber",
DROP COLUMN "blockNumber",
ADD COLUMN     "blockNumber" INTEGER,
DROP COLUMN "transactionIndex",
ADD COLUMN     "transactionIndex" INTEGER,
DROP COLUMN "logIndex",
ADD COLUMN     "logIndex" INTEGER NOT NULL;
