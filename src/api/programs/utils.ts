import { RequisitesSimpleEngine } from "../requisites/engine"
import { CatalogProgramDocument } from "./types"

export const convertProgramEnginedDocument = (programDocument: CatalogProgramDocument): any => {
  return {
    ...programDocument,
    requisites: new RequisitesSimpleEngine(programDocument.requisites.requisitesSimple)
  }
}