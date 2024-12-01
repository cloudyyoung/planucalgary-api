/*
  Warnings:

  - You are about to drop the column `grade_mode_code` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "catalog"."courses" DROP COLUMN "grade_mode_code";
