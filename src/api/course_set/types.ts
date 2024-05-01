import { StructureConditionEngine } from "../requisites/engine";

interface CatalogCourseSetDocument {
  course_list: string[];
  description: string | null;
  id: string;
  name: string;
  structure: object;
  type: "static" | "dynamic";
}

interface CatalogCourseSetEnginedDocument extends Omit<CatalogCourseSetDocument, "structure"> {
  structure: StructureConditionEngine;
}

export { CatalogCourseSetDocument, CatalogCourseSetEnginedDocument }