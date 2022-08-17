/*
  Warnings:

  - The primary key for the `DSPBookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `DSPBookings` table. All the data in the column will be lost.
  - The primary key for the `DSPUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `status` to the `DSPBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `DSPBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DSPBookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DSPBookings" DROP CONSTRAINT "DSPBookings_userId_fkey";

-- AlterTable
ALTER TABLE "DSPBookings" DROP CONSTRAINT "DSPBookings_pkey",
DROP COLUMN "email",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DSPBookings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DSPBookings_id_seq";

-- AlterTable
ALTER TABLE "DSPUser" DROP CONSTRAINT "DSPUser_pkey",
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DSPUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DSPUser_id_seq";

-- CreateTable
CREATE TABLE "DSPTransactions" (
    "id" TEXT NOT NULL,
    "datePaid" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,

    CONSTRAINT "DSPTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DSPUser_email_idx" ON "DSPUser"("email");

-- AddForeignKey
ALTER TABLE "DSPBookings" ADD CONSTRAINT "DSPBookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DSPUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DSPTransactions" ADD CONSTRAINT "DSPTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DSPUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DSPTransactions" ADD CONSTRAINT "DSPTransactions_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "DSPBookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
