import { StructureConditionEngine, RequisitesSimpleEngine } from "./engine"
import { CatalogCourseSetEnginedDocument, CatalogProgramEnginedDocument, RequisiteSetDocumentEngined } from "./types"
import { CatalogCourseSetDocument } from "../api/catalog_course_sets/types"
import { RequisiteSetDocument } from "../api/catalog_requisite_sets/types"
import { CatalogProgramDocument } from "../api/catalog_programs/types"

export const convertCourseSetEnginedDocument = (doc: CatalogCourseSetDocument): CatalogCourseSetEnginedDocument => {
  const hasStructure = typeof doc.structure !== "undefined"
  const ret = {
    ...doc,
    structure: hasStructure ? new StructureConditionEngine(doc.structure, doc.type) : new StructureConditionEngine({}),
  }
  return ret
}

export const convertProgramEnginedDocument = (
  programDocument: CatalogProgramDocument,
): CatalogProgramEnginedDocument => {
  const hasRequisites =
    typeof programDocument.requisites !== "undefined" &&
    typeof programDocument.requisites.requisitesSimple !== "undefined" &&
    Array.isArray(programDocument.requisites.requisitesSimple)

  const requisitesSimple = programDocument.requisites.requisitesSimple

  const ret = {
    ...programDocument,
    requisites: new RequisitesSimpleEngine(hasRequisites ? requisitesSimple : []),
  }
  return ret
}

export const convertRequisiteSetEnginedDocument = (doc: RequisiteSetDocument): RequisiteSetDocumentEngined => {
  const hasRequisites = typeof doc.requisites !== "undefined" && doc.requisites.length > 0
  const ret = {
    ...doc,
    requisites: new RequisitesSimpleEngine(hasRequisites ? doc.requisites : []),
  }
  return ret
}
