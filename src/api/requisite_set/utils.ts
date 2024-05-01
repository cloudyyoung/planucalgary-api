import { RequisitesSimpleEngine } from "../requisites/engine";
import { RequisiteSetDocument, RequisiteSetDocumentEngined } from "./types";

export const convertEngined = (doc: RequisiteSetDocument): RequisiteSetDocumentEngined => {
  return {
    ...doc,
    requisites: new RequisitesSimpleEngine(doc.requisites)
  }
}