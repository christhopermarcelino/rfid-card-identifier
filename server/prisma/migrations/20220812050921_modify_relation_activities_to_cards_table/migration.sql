/*
  Warnings:

  - You are about to drop the column `nim` on the `activities` table. All the data in the column will be lost.
  - Added the required column `code` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_nim_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "nim",
ADD COLUMN     "code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_code_fkey" FOREIGN KEY ("code") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
