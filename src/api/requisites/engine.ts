import { plainToClass } from 'class-transformer';
import { Requisites } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';
import { CatalogRequisiteSet } from '../requisite_set/model';

class RequisitesEngine {
  public requisites: Requisites
  public hydrated = false

  constructor(requisites: any) {
    this.requisites = plainToClass(Requisites, requisites)
  }

  async hydrate() {
    await this.requisites.hydrate()
    this.hydrated = true
  }
}

class StructureConditionEngine {
  private structure: StructureCondition

  constructor(structure: any) {
    this.structure = plainToClass(StructureCondition, structure)
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