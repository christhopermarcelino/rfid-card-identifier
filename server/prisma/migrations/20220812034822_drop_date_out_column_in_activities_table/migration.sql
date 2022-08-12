/*
  Warnings:

  - You are about to drop the column `date_in` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `date_out` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "date_in",
DROP COLUMN "date_out",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
