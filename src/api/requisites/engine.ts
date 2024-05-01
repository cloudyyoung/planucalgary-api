import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';
import { CatalogRequisiteSet } from '../requisite_set/model';

class RequisitesEngine {
  public requisites: Requisites
  private facts: any

  constructor(requisites: any, facts: any) {
    this.requisites = plainToClass(Requisites, requisites)
    this.facts = facts
  }

  async hydrate() {
    await this.requisites.hydrate()
  }
}

class StructureConditionEngine {
  private structure: StructureCondition
  private facts: any

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
    console.log(course_map)
    return course_map
  }
}

export { RequisitesEngine, StructureConditionEngine };