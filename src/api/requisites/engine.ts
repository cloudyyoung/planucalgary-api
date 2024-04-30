import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';
import { CatalogRequisiteSet } from '../requisite_set/model';
import { CatalogSetsProps } from './types';

class RequisitesEngine {
  public requisites: Requisites
  private facts: any

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }

  async hydrate() {
    await this.requisites.hydrate(await this.getSets())
  }

  async getSetIds() {
    return this.requisites.getSetIds()
  }

  async getSets() {
    const set_ids = await this.getSetIds()

    const course_sets = await CatalogCourseSet.find({ id: { $in: set_ids } })
    const requisite_sets = await CatalogRequisiteSet.find({ requisite_set_group_id: { $in: set_ids } })

    await course_sets.forEach(set => set.structure = new StructureConditionEngine(set.structure, this.facts))
    await requisite_sets.forEach(set => set.requisites = new StructureConditionEngine(set.requisites, this.facts))

    const sets = new Map<String, any>()
    course_sets.forEach(set => sets.set(set.id, set))
    requisite_sets.forEach(set => sets.set(set.requisite_set_group_id, set))
    return sets
  }
}

class StructureConditionEngine {
  private structure: StructureCondition
  private facts: any
  private courses: Map<String, any> = new Map()

  constructor(structure: any, facts: any) {
    this.structure = plainToClass(StructureCondition, structure)
    this.facts = facts
  }

  async hydrate() {
    await this.getCourses()
  }

  async getCoursesIds() {
    return this.structure.getCourseIds()
  }

  async getCourses() {
    const course_ids = await this.getCoursesIds()
    const courses = await CatalogCourseSet.find({ id: { $in: course_ids } })
    const course_map = new Map<String, any>()
    courses.forEach(course => course_map.set(course.id, course))
    return course_map
  }
}

export { RequisitesEngine, StructureConditionEngine };