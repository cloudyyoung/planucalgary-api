-- AlterTable
ALTER TABLE "catalog"."courses" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "catalog"."courses_topics" ALTER COLUMN "description" DROP NOT NULL;
