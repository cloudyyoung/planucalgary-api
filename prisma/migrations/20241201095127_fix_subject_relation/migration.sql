-- DropForeignKey
ALTER TABLE "catalog"."courses" DROP CONSTRAINT "courses_code_fkey";

-- AddForeignKey
ALTER TABLE "catalog"."courses" ADD CONSTRAINT "courses_subject_code_fkey" FOREIGN KEY ("subject_code") REFERENCES "catalog"."subjects"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
