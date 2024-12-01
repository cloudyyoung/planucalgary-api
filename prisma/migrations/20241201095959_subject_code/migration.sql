/*
  Warnings:

  - A unique constraint covering the columns `[code,title]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subject_code_title_unique" ON "catalog"."subjects"("code", "title");
