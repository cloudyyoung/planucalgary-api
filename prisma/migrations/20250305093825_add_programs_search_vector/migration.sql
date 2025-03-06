
-- AlterTable
ALTER TABLE "catalog"."programs" ADD COLUMN "search_vector" tsvector;

-- CreateFunction 
-- IMPORTANT: This generates a new default value for the column. This operation is not maintained in the prisma schema file because it is unsupported.
CREATE OR REPLACE FUNCTION catalog.update_program_text_search() RETURNS trigger AS $$
BEGIN   
    NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.code, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.long_name, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.display_name, '')), 'A') || 
        setweight(to_tsvector('english', coalesce(NEW.degree_designation_code, '')), 'B') || 
        setweight(to_tsvector('english', coalesce(NEW.degree_designation_name, '')), 'B') || 
        setweight(to_tsvector('english', coalesce(NEW.general_info, '')), 'C') || 
        setweight(to_tsvector('english', coalesce(NEW.pid, '')), 'D') || 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_text_search_trigger
BEFORE INSERT OR UPDATE ON "catalog"."programs"
FOR EACH ROW EXECUTE FUNCTION update_program_text_search();


-- CreateIndex
CREATE INDEX "program_search_vector_gin" ON "catalog"."programs" USING GIN ("search_vector");
