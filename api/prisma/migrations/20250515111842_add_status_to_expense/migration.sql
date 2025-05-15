/*
  Warnings:

  - You are about to drop the column `supplier_name` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `status` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "supplier_name",
ADD COLUMN     "status" TEXT NOT NULL;
