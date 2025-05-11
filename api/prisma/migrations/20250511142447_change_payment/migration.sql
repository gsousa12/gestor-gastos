/*
  Warnings:

  - You are about to drop the column `recurring_debit_deducted` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `recurring_debit_deducted_type` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "recurring_debit_deducted",
DROP COLUMN "recurring_debit_deducted_type",
ADD COLUMN     "recurring_debit_deducted" INTEGER,
ADD COLUMN     "recurring_debit_deducted_type" TEXT;
