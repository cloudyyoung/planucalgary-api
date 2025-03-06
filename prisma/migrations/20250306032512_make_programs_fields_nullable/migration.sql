-- AlterTable
ALTER TABLE "catalog"."programs" ALTER COLUMN "degree_designation_code" DROP NOT NULL,
ALTER COLUMN "degree_designation_name" DROP NOT NULL,
ALTER COLUMN "transcript_level" DROP NOT NULL,
ALTER COLUMN "transcript_description" DROP NOT NULL;
