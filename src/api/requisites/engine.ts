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
  public type: "static" | "dynamic"

  constructor(structure?: object, type: "static" | "dynamic" = "static") {
    super()
    this.structure = plainToClass(StructureCondition, structure)
    this.type = type
  }

  async hydrate() {
    if (this.type === "static") {
      await this.structure.hydrate()
    }
    this.hydrated = true
  }
}

export { RequisitesSimpleEngine, StructureConditionEngine };