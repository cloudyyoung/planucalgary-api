import { RequisitesEngine } from "../requisites/engine";
import { RequisiteSetDocument, RequisiteSetDocumentEngined } from "./types";

export const convertEngined = (doc: RequisiteSetDocument): RequisiteSetDocumentEngined => {
  return {
    ...doc,
    requisites: new RequisitesEngine(doc.requisites)
  }
}