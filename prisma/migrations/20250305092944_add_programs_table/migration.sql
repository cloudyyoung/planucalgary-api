/*
  Warnings:

  - You are about to drop the `terms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "catalog"."terms";

-- CreateTable
CREATE TABLE "catalog"."programs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pid" TEXT NOT NULL,
    "coursedog_id" TEXT NOT NULL,
    "program_group_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "long_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "degree_designation_code" TEXT NOT NULL,
    "degree_designation_name" TEXT NOT NULL,
    "career" "catalog"."Career" NOT NULL,
    "admission_info" TEXT,
    "general_info" TEXT,
    "transcript_level" INTEGER NOT NULL,
    "transcript_description" TEXT NOT NULL,
    "requisites" JSONB,
    "is_active" BOOLEAN NOT NULL,
    "start_term" JSONB,
    "program_created_at" TIMESTAMP(3) NOT NULL,
    "program_last_updated_at" TIMESTAMP(3) NOT NULL,
    "program_effective_start_date" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog"."_FacultyToProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FacultyToProgram_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "catalog"."_DepartmentToProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DepartmentToProgram_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "programs_pid_key" ON "catalog"."programs"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "programs_code_key" ON "catalog"."programs"("code");

-- CreateIndex
CREATE INDEX "_FacultyToProgram_B_index" ON "catalog"."_FacultyToProgram"("B");

-- CreateIndex
CREATE INDEX "_DepartmentToProgram_B_index" ON "catalog"."_DepartmentToProgram"("B");

-- AddForeignKey
ALTER TABLE "catalog"."_FacultyToProgram" ADD CONSTRAINT "_FacultyToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_FacultyToProgram" ADD CONSTRAINT "_FacultyToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToProgram" ADD CONSTRAINT "_DepartmentToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "catalog"."departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog"."_DepartmentToProgram" ADD CONSTRAINT "_DepartmentToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "catalog"."programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
