import { RequisitesProps, RequisitesSimpleProps } from "./models";
import { RequisitesSimple } from "./requisites_simple";

class RequisitesEngine {
  private requisites: RequisitesProps
  private requisitesSimple: RequisitesSimple
  private facts: any

  constructor(requisites: RequisitesProps, facts: any) {
    this.requisites = requisites
    this.facts = facts
    this.requisitesSimple = new RequisitesSimple(this.requisites.requisitesSimple)
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