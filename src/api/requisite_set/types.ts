import { RequisitesSimpleEngine } from "../requisites/engine";

interface RequisiteSetDocument {
  id: string;
  name: string;
  description: string;
  requisite_set_group_id: string;
  requisites: Array<object>;
  version: number;
}

interface RequisiteSetDocumentEngined extends Omit<RequisiteSetDocument, "requisites"> {
  requisites: RequisitesSimpleEngine;
}

export { RequisiteSetDocument, RequisiteSetDocumentEngined }