-- AlterTable
ALTER TABLE "catalog"."_CourseToDepartment" ADD CONSTRAINT "_CourseToDepartment_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "catalog"."_CourseToDepartment_AB_unique";

-- AlterTable
ALTER TABLE "catalog"."_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "catalog"."_CourseToFaculty_AB_unique";

-- AlterTable
ALTER TABLE "catalog"."_DepartmentToFaculty" ADD CONSTRAINT "_DepartmentToFaculty_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "catalog"."_DepartmentToFaculty_AB_unique";

-- AlterTable
ALTER TABLE "catalog"."_DepartmentToSubject" ADD CONSTRAINT "_DepartmentToSubject_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "catalog"."_DepartmentToSubject_AB_unique";

-- AlterTable
ALTER TABLE "catalog"."courses" ADD COLUMN     "search_vector" tsvector;

-- CreateFunction 
-- IMPORTANT: This generates a new default value for the column. This operation is not maintained in the prisma schema file because it is unsupported.
CREATE OR REPLACE FUNCTION catalog.update_course_text_search() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.code, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.subject_code, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.course_number, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.long_name, '')), 'B') || 
        setweight(to_tsvector('english', coalesce(NEW.aka, '')), 'B') || 
        setweight(to_tsvector('english', coalesce(NEW.name, '')), 'C') || 
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C') || 
        setweight(to_tsvector('english', coalesce(NEW.prereq, '')), 'D') || 
        setweight(to_tsvector('english', coalesce(NEW.antireq, '')), 'D') || 
        setweight(to_tsvector('english', coalesce(NEW.coreq, '')), 'D');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_text_search_trigger
BEFORE INSERT OR UPDATE ON "catalog"."courses"
FOR EACH ROW EXECUTE FUNCTION catalog.update_course_text_search();


-- CreateIndex
CREATE INDEX "course_search_vector_gin" ON "catalog"."courses" USING GIN ("search_vector");
