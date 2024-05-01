import { RequisitesSimpleEngine } from "../requisites/engine";
import { RequisiteSetDocument, RequisiteSetDocumentEngined } from "./types";

export const convertRequisiteSetEnginedDocument = (doc: any): RequisiteSetDocumentEngined => {
  const hasRequisites = typeof doc.requisites !== "undefined" && doc.requisites.length > 0
  const ret = {
    ...doc,
    requisites: new RequisitesSimpleEngine(hasRequisites ? doc.requisites : [])
  }
  return ret
}