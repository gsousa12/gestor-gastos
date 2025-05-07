/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `sector_id` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `subsector_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_sector_id_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "deleted_at",
DROP COLUMN "sector_id",
ADD COLUMN     "subsector_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SubSector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "sector_id" INTEGER NOT NULL,

    CONSTRAINT "SubSector_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubSector" ADD CONSTRAINT "SubSector_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subsector_id_fkey" FOREIGN KEY ("subsector_id") REFERENCES "SubSector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
