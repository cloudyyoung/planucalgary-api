/*
  Warnings:

  - A unique constraint covering the columns `[number,course_id]` on the table `course_topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "course_topic_number_course_unique" ON "catalog"."course_topics"("number", "course_id");
