/*
  Warnings:

  - You are about to drop the column `program` on the `requisites_jsons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requisite_type,text,departments,faculties]` on the table `requisites_jsons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "catalog"."requisite_components_unique";

-- AlterTable
ALTER TABLE "catalog"."requisites_jsons" DROP COLUMN "program",
ADD COLUMN     "valid" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "requisite_components_unique" ON "catalog"."requisites_jsons"("requisite_type", "text", "departments", "faculties");
