-- AlterTable
ALTER TABLE "ExpenseItem" ADD COLUMN     "total_value" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "unit_value" DROP NOT NULL;
