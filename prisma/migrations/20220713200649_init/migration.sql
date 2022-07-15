-- CreateTable
CREATE TABLE "DSPBookings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "DSPBookings_pkey" PRIMARY KEY ("id")
);
