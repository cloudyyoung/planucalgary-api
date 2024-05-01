import { RequisitesSimpleEngine } from "../requisites/engine";
import { RequisiteSetDocument, RequisiteSetDocumentEngined } from "./types";

export const convertRequisiteSetEnginedDocument = (doc: RequisiteSetDocument): RequisiteSetDocumentEngined => {
  return {
    ...doc,
    requisites: new RequisitesSimpleEngine(doc.requisites)
  }
}