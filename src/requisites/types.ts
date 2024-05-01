import { RequisitesSimpleEngine, StructureConditionEngine } from "./engine";
import { CatalogCourseSetDocument } from "../api/catalog_course_sets/types";
import { CourseDocument } from "../api/catalog_courses/types";
import { CatalogProgramDocument } from "../api/catalog_programs/types";
import { RequisiteSetDocument } from "../api/catalog_requisite_sets/types";

type CatalogSetsProps = CatalogCourseSetDocument | CatalogCourseSetDocument;

interface CatalogCourseSetEnginedDocument extends Omit<CatalogCourseSetDocument, "structure"> {
  structure: StructureConditionEngine;
}

interface CourseEnginedDocument extends Omit<CourseDocument, "requisites"> {
  requisites: RequisitesSimpleEngine;
}

interface CatalogProgramEnginedDocument extends Omit<CatalogProgramDocument, "requisites"> {
  requisites: RequisitesSimpleEngine;
}

interface RequisiteSetDocumentEngined extends Omit<RequisiteSetDocument, "requisites"> {
  requisites: RequisitesSimpleEngine;
}

export {
  CatalogSetsProps,
  CatalogCourseSetEnginedDocument,
  CourseEnginedDocument,
  CatalogProgramEnginedDocument,
  RequisiteSetDocumentEngined
}