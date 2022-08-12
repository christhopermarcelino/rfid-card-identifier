/*
  Warnings:

  - You are about to drop the column `studentId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `cards` table. All the data in the column will be lost.
  - Added the required column `nim` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_studentId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_studentId_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "studentId",
ADD COLUMN     "nim" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "studentId",
ADD COLUMN     "nim" VARCHAR(30);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_nim_fkey" FOREIGN KEY ("nim") REFERENCES "students"("nim") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_nim_fkey" FOREIGN KEY ("nim") REFERENCES "students"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
