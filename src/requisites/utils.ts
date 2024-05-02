import { StructureConditionEngine, RequisitesSimpleEngine } from "./engine"
import { CatalogCourseSetEnginedDocument, CatalogProgramEnginedDocument, RequisiteSetDocumentEngined } from "./types"

export const convertCourseSetEnginedDocument = (doc: any): CatalogCourseSetEnginedDocument => {
  const hasStructure = typeof doc.structure !== "undefined"
  const ret = {
    ...doc,
    structure: hasStructure ? new StructureConditionEngine(doc.structure, doc.type) : null,
  }
  return ret
}

export const convertProgramEnginedDocument = (programDocument: any): CatalogProgramEnginedDocument => {
  const hasRequisites =
    typeof programDocument.requisites !== "undefined" &&
    typeof programDocument.requisites.requisitesSimple !== "undefined"
  const ret = {
    ...programDocument,
    requisites: new RequisitesSimpleEngine(hasRequisites ? programDocument.requisites.requisitesSimple : []),
  }
  return ret
}

export const convertRequisiteSetEnginedDocument = (doc: any): RequisiteSetDocumentEngined => {
  const hasRequisites = typeof doc.requisites !== "undefined" && doc.requisites.length > 0
  const ret = {
    ...doc,
    requisites: new RequisitesSimpleEngine(hasRequisites ? doc.requisites : []),
  }
  return ret
}
