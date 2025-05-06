/*
  Warnings:

  - Added the required column `sector_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "sector_id" INTEGER NOT NULL,
ADD COLUMN     "supplier_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
