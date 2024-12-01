/*
  Warnings:

  - You are about to drop the column `antiereq_json` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "catalog"."courses" DROP COLUMN "antiereq_json",
ADD COLUMN     "antireq_json" JSONB;
