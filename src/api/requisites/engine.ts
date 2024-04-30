import { RequisitesProps } from "./types";

class RequisitesEngine {
  private requisites: RequisitesProps
  private facts: any

  constructor(requisites: RequisitesProps, facts: any) {
    this.requisites = requisites
    this.facts = facts
  }

  setRequisites(requisites: RequisitesProps) {
    this.requisites = requisites
  }

  setFacts(facts: any) {
    this.facts = facts
  }
}

export default RequisitesEngine;
export { RequisitesEngine };