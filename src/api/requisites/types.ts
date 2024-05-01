import { RequisitesSimpleEngine, StructureConditionEngine } from "./engine";
import { CatalogCourseSetDocument } from "../course_set/types";
import { CourseDocument } from "../courses/types";
import { CatalogProgramDocument } from "../programs/types";
import { RequisiteSetDocument } from "../requisite_set/types";

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