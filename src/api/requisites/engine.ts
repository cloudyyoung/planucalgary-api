import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';
import { CatalogRequisiteSet } from '../requisite_set/model';

class RequisitesEngine {
  private requisites: Requisites
  private facts: any
  private sets: {} = {}

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }

  async getSetIds() {
    return this.requisites.getSetIds()
  }

  async getSets() {
    const set_ids = await this.getSetIds()

    const course_sets = await CatalogCourseSet.find({ id: { $in: set_ids } })
    const requisite_sets = await CatalogRequisiteSet.find({ requisite_set_group_id: { $in: set_ids } })


    const combined_sets = [...course_sets, ...requisite_sets]
    const sets = toMap(combined_sets)

    this.sets = sets
    return sets
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

const toMap = (array: any[]) => {
  return new Map(array.map(item => [item.id, item]))
}

export { RequisitesEngine, StructureConditionEngine };