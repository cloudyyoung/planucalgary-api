import { plainToClass } from 'class-transformer';
import { RequisitesSimple } from "./classes/requisites";
import { StructureCondition } from './classes/structure_condition';
import { CatalogCourseSet } from '../course_set/models';

abstract class Engine {
  public hydrated: boolean = false
  abstract hydrate(): Promise<void>
}

class RequisitesSimpleEngine extends Engine {
  public rules: RequisitesSimple[]

  constructor(requisites: any[]) {
    super()
    const members = requisites.map(member => plainToClass(RequisitesSimple, member))
    this.rules = members
  }

  async hydrate(): Promise<void> {
    for (const member of this.rules) {
      await member.hydrate()
    }
    this.hydrated = true
  }
}

class StructureConditionEngine extends Engine {
  private structure: StructureCondition

  constructor(structure: any) {
    super()
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

export { RequisitesSimpleEngine, StructureConditionEngine };