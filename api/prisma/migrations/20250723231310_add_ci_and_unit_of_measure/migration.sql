-- AlterTable
ALTER TABLE "ExpenseItem" ADD COLUMN     "unit_of_measure" TEXT NOT NULL DEFAULT 'unidade',
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "ci" INTEGER;
