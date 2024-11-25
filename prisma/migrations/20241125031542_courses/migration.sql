-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "catalog";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "planucalgary";

-- CreateEnum
CREATE TYPE "catalog"."CourseComponent" AS ENUM ('LAB', 'LECTURE', 'SECTION', 'SEMINAR', 'SUPERVISED_STUDY', 'TUTORIAL');

-- CreateEnum
CREATE TYPE "catalog"."Career" AS ENUM ('UNDERGRADUATE_PROGRAM', 'GRADUATE_PROGRAM', 'MEDICINE_PROGRAM');

-- CreateEnum
CREATE TYPE "catalog"."GradeMode" AS ENUM ('CDF', 'CNC', 'CRF', 'ELG', 'GRD', 'MTG');

-- CreateEnum
CREATE TYPE "catalog"."TermName" AS ENUM ('WINTER', 'SPRING', 'SUMMER', 'FALL');

-- CreateTable
CREATE TABLE "planucalgary"."accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."courses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "course_number" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "long_name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "aka" TEXT,
    "prereq" TEXT,
    "prereq_json" JSONB,
    "coreq" TEXT,
    "coreq_json" JSONB,
    "antireq" TEXT,
    "antiereq_json" JSONB,
    "active" BOOLEAN NOT NULL,
    "multi_term" BOOLEAN NOT NULL,
    "nogpa" BOOLEAN NOT NULL,
    "repeatable" BOOLEAN NOT NULL,
    "components" "catalog"."CourseComponent"[],
    "course_group_id" TEXT NOT NULL,
    "coursedog_id" TEXT NOT NULL,
    "course_created_at" TIMESTAMP(3) NOT NULL,
    "course_effective_start_date" TIMESTAMP(3) NOT NULL,
    "course_last_updated_at" TIMESTAMP(3) NOT NULL,
    "career" "catalog"."Career" NOT NULL,
    "grade_mode_code" TEXT NOT NULL,
    "grade_mode" "catalog"."GradeMode" NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."course_topics" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "long_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repeatable" BOOLEAN NOT NULL,
    "units" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "course_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."faculties" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."departments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."terms" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "term_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "name" "catalog"."TermName" NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."subjects" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."_CourseToDepartment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "catalog"."_CourseToFaculty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "catalog"."_DepartmentToFaculty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "catalog"."_DepartmentToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "planucalgary"."accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "courses_cid_key" ON "catalog"."courses"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "catalog"."courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "course_subject_course_number_unique" ON "catalog"."courses"("subject_code", "course_number");

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_code_key" ON "catalog"."course_topics"("code");

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_name_key" ON "catalog"."course_topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_long_name_key" ON "catalog"."course_topics"("long_name");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_name_key" ON "catalog"."faculties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_code_key" ON "catalog"."faculties"("code");

-- CreateIndex
CREATE INDEX "faculty_code_unique" ON "catalog"."faculties"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "catalog"."departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "catalog"."departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "terms_term_id_key" ON "catalog"."terms"("term_id");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "catalog"."subjects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_title_key" ON "catalog"."subjects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToDepartment_AB_unique" ON "catalog"."_CourseToDepartment"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToDepartment_B_index" ON "catalog"."_CourseToDepartment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToFaculty_AB_unique" ON "catalog"."_CourseToFaculty"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToFaculty_B_index" ON "catalog"."_CourseToFaculty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToFaculty_AB_unique" ON "catalog"."_DepartmentToFaculty"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToFaculty_B_index" ON "catalog"."_DepartmentToFaculty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToSubject_AB_unique" ON "catalog"."_DepartmentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToSubject_B_index" ON "catalog"."_DepartmentToSubject"("B");

-- AddForeignKey
ALTER TABLE "catalog"."courses" ADD CONSTRAINT "courses_code_fkey" FOREIGN KEY ("code") REFERENCES "catalog"."subjects"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."course_topics" ADD CONSTRAINT "course_topics_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "catalog"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_CourseToDepartment" ADD CONSTRAINT "_CourseToDepartment_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_CourseToDepartment" ADD CONSTRAINT "_CourseToDepartment_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToFaculty" ADD CONSTRAINT "_DepartmentToFaculty_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToFaculty" ADD CONSTRAINT "_DepartmentToFaculty_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToSubject" ADD CONSTRAINT "_DepartmentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToSubject" ADD CONSTRAINT "_DepartmentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
