/*
  Warnings:

  - You are about to drop the column `code` on the `course_topics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `course_topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `course_topics` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "catalog"."course_topics_code_key";

-- AlterTable
ALTER TABLE "catalog"."course_topics" DROP COLUMN "code",
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_number_key" ON "catalog"."course_topics"("number");
