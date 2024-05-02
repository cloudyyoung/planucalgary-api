import { RequisitesSimpleEngine, StructureConditionEngine } from "./engine"
import { CatalogCourseSetDocument } from "../api/catalog_course_sets/types"
import { CourseDocument } from "../api/catalog_courses/types"
import { CatalogProgramDocument } from "../api/catalog_programs/types"
import { RequisiteSetDocument } from "../api/catalog_requisite_sets/types"
import { FlattenMaps } from "mongoose"

type CatalogCourseSetMap = FlattenMaps<CatalogCourseSetDocument>

type CatalogCourseMap = FlattenMaps<CourseDocument>

type CatalogProgramMap = FlattenMaps<CatalogProgramDocument>

type CatalogRequisiteSetMap = FlattenMaps<RequisiteSetDocument>

type CatalogSetsMap = CatalogCourseSetMap | CatalogCourseSetMap

interface CatalogCourseSetEnginedMap extends Omit<CatalogCourseSetMap, "structure"> {
  structure: StructureConditionEngine
}

interface CourseEnginedMap extends Omit<CatalogCourseMap, "requisites"> {
  requisites: RequisitesSimpleEngine
}

interface CatalogProgramEnginedMap extends Omit<CatalogProgramMap, "requisites"> {
  requisites: RequisitesSimpleEngine
}

interface RequisiteSetDocumentEnginedMap extends Omit<CatalogRequisiteSetMap, "requisites"> {
  requisites: RequisitesSimpleEngine
}

export {
  CatalogSetsMap,
  CatalogCourseSetMap,
  CatalogCourseMap,
  CatalogProgramMap,
  CatalogRequisiteSetMap,
  CatalogCourseSetEnginedMap,
  CourseEnginedMap,
  CatalogProgramEnginedMap,
  RequisiteSetDocumentEnginedMap,
}
