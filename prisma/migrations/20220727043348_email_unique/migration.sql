/*
  Warnings:

  - You are about to drop the column `name` on the `DSPBookings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `DSPUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `DSPBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `DSPUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DSPBookings" DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DSPUser" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DSPUser_email_key" ON "DSPUser"("email");

-- AddForeignKey
ALTER TABLE "DSPBookings" ADD CONSTRAINT "DSPBookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DSPUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
