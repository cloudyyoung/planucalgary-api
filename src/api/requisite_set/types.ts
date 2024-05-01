interface RequisiteSetDocument {
  id: string;
  name: string;
  description: string;
  requisite_set_group_id: string;
  requisites: Array<object>;
  version: number;
}

export { RequisiteSetDocument }