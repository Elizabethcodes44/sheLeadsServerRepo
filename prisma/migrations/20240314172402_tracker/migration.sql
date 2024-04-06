-- DropIndex
DROP INDEX "User_firstName_key";

-- CreateTable
CREATE TABLE "Tracker" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "bloodPressure" INTEGER NOT NULL,
    "fetalMovements" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tracker_userId_key" ON "Tracker"("userId");

-- AddForeignKey
ALTER TABLE "Tracker" ADD CONSTRAINT "Tracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
