/*
  Warnings:

  - You are about to drop the column `departmentId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_departmentId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "departmentId";

-- DropTable
DROP TABLE "departments";
