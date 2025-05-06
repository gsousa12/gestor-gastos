-- DropIndex
DROP INDEX "Supplier_tax_id_key";

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "deleted_at" TIMESTAMP(3);
