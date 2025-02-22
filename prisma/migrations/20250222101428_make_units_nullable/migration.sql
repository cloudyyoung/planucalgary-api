-- AlterTable
ALTER TABLE "catalog"."courses" ALTER COLUMN "units" DROP NOT NULL;

-- AlterTable
ALTER TABLE "catalog"."courses_topics" ALTER COLUMN "units" DROP NOT NULL;
