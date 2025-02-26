/*
  Warnings:

  - You are about to drop the column `jsons` on the `requisites_jsons` table. All the data in the column will be lost.
  - Added the required column `json` to the `requisites_jsons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catalog"."requisites_jsons" DROP COLUMN "jsons",
ADD COLUMN     "json" JSONB NOT NULL,
ADD COLUMN     "json_choices" JSONB[];
