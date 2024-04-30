import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';
import { CatalogRequisiteSet } from '../requisite_set/model';

class RequisitesEngine {
  private requisites: Requisites
  private facts: any
  private course_sets: {} = {}
  private requisite_sets: {} = {}

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }

  async getCourseSetIds() {
    return this.requisites.getCourseSetIds()
  }

  async getCourseSets() {
    const course_set_ids = await this.getCourseSetIds()
    const course_sets = await CatalogCourseSet.find({ id: { $in: course_set_ids } }).exec()
    const course_set_map = new Map(course_sets.map(course_set => [course_set.id, course_set]))
    this.course_sets = course_set_map
    return course_set_map
  }

  getRequisiteSetIds() {
    return this.requisites.getRequisiteSetIds()
  }

  async getRequisiteSets() {
    const requisite_set_ids = await this.getRequisiteSetIds()
    const requisite_sets = await CatalogRequisiteSet.find({ requisite_set_group_id: { $in: requisite_set_ids } }).exec()
    const requisite_set_map = new Map(requisite_sets.map(requisite_set => [requisite_set.id, requisite_set]))
    this.requisite_sets = requisite_set_map
    return requisite_set_map
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