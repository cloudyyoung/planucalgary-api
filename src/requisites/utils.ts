import { StructureConditionEngine, RequisitesSimpleEngine } from "./engine"
import { CatalogCourseSetEnginedMap, CatalogProgramEnginedMap, RequisiteSetDocumentEnginedMap } from "./types"
import { CatalogCourseSetMap, CatalogProgramMap, CatalogRequisiteSetMap } from "./types"

export const convertCourseSetEnginedDocument = (doc: CatalogCourseSetMap): CatalogCourseSetEnginedMap => {
  const hasStructure = typeof doc.structure !== "undefined"
  const ret = {
    ...doc,
    structure: hasStructure ? new StructureConditionEngine(doc.structure, doc.type) : new StructureConditionEngine({}),
  }
  return ret
}

export const convertProgramEnginedDocument = (programDocument: CatalogProgramMap): CatalogProgramEnginedMap => {
  const hasRequisites = typeof programDocument.requisites !== "undefined"

  const ret = {
    ...programDocument,
    requisites: new RequisitesSimpleEngine(hasRequisites ? programDocument.requisites : []),
  }
  return ret
}

export const convertRequisiteSetEnginedDocument = (doc: CatalogRequisiteSetMap): RequisiteSetDocumentEnginedMap => {
  const hasRequisites = typeof doc.requisites !== "undefined" && doc.requisites.length > 0
  const ret = {
    ...doc,
    requisites: new RequisitesSimpleEngine(hasRequisites ? doc.requisites : []),
  }
  return ret
}
