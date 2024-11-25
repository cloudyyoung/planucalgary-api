/*
  Warnings:

  - You are about to drop the column `repeatable` on the `course_topics` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `multi_term` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `nogpa` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `repeatable` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `departments` table. All the data in the column will be lost.
  - Added the required column `is_repeatable` to the `course_topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_multi_term` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_nogpa` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_repeatable` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catalog"."course_topics" DROP COLUMN "repeatable",
ADD COLUMN     "is_repeatable" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "catalog"."courses" DROP COLUMN "active",
DROP COLUMN "multi_term",
DROP COLUMN "nogpa",
DROP COLUMN "repeatable",
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "is_multi_term" BOOLEAN NOT NULL,
ADD COLUMN     "is_nogpa" BOOLEAN NOT NULL,
ADD COLUMN     "is_repeatable" BOOLEAN NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "catalog"."departments" DROP COLUMN "active",
ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "planucalgary"."accounts" ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;
