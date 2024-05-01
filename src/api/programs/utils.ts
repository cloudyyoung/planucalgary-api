import { RequisitesSimpleEngine } from "../requisites/engine"
import { CatalogProgramEnginedDocument } from "./types"

export const convertProgramEnginedDocument = (programDocument: any): CatalogProgramEnginedDocument => {
  const hasRequisites = typeof programDocument.requisites !== "undefined" && typeof programDocument.requisites.requisitesSimple !== "undefined"
  const ret = {
    ...programDocument,
    requisites: new RequisitesSimpleEngine(hasRequisites ? programDocument.requisites.requisitesSimple : [])
  }
  return ret
}