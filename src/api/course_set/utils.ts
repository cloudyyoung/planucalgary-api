import { StructureConditionEngine } from "../requisites/engine";
import { CatalogCourseSetEnginedDocument } from "./types";

export const convertCourseSetEnginedDocument = (doc: any): CatalogCourseSetEnginedDocument => {
  const hasStructure = typeof doc.structure !== "undefined"
  const ret = {
    ...doc,
    structure: hasStructure ? new StructureConditionEngine(doc.structure) : null
  }
  return ret
}