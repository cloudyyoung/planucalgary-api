import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes";

class RequisitesEngine {
  private requisites: Requisites
  private facts: any

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }
}

export default RequisitesEngine;
export { RequisitesEngine };