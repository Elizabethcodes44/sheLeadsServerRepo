/*
  Warnings:

  - Made the column `lastAppointment` on table `Tracker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nextAppointment` on table `Tracker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tracker" ALTER COLUMN "lastAppointment" SET NOT NULL,
ALTER COLUMN "lastAppointment" SET DATA TYPE TEXT,
ALTER COLUMN "nextAppointment" SET NOT NULL,
ALTER COLUMN "nextAppointment" SET DATA TYPE TEXT;
