-- AlterTable
ALTER TABLE "catalog"."course_topics" RENAME TO "courses_topics";

-- AlterTable
ALTER TABLE "catalog"."courses_topics" RENAME CONSTRAINT "course_topics_pkey" TO "courses_topics_pkey";

-- RenameForeignKey
ALTER TABLE "catalog"."courses_topics" RENAME CONSTRAINT "course_topics_course_id_fkey" TO "courses_topics_course_id_fkey";

-- RenameIndex
ALTER INDEX "catalog"."course_topics_long_name_key" RENAME TO "courses_topics_long_name_key";

-- RenameIndex
ALTER INDEX "catalog"."course_topics_name_key" RENAME TO "courses_topics_name_key";

-- RenameIndex
ALTER INDEX "catalog"."course_topics_number_key" RENAME TO "courses_topics_number_key";
