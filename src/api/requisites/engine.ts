import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';

class RequisitesEngine {
  private requisites: Requisites
  private facts: any

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }

  getCourseSetIds() {
    return this.requisites.getCourseSetIds()
  }

  getRequisiteSetIds() {
    return this.requisites.getRequisiteSetIds()
  }
}

class StructureConditionEngine {
  private structure: StructureCondition
  private facts: any

  constructor(structure: any, facts: any) {
    this.structure = plainToClass(StructureCondition, structure)
    this.facts = facts
  }
}

export { RequisitesEngine, StructureConditionEngine };