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
  public structure: StructureCondition

  constructor(structure?: object) {
    super()
    this.structure = plainToClass(StructureCondition, structure)
  }

  async hydrate() {
    this.hydrated = true
  }
}

export { RequisitesSimpleEngine, StructureConditionEngine };