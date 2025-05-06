-- AlterTable
ALTER TABLE "Sector" ALTER COLUMN "created_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "mouth" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
