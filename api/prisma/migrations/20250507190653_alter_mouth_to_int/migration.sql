/*
  Warnings:

  - Changed the type of `month` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;
