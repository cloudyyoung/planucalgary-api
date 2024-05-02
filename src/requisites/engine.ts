import { plainToClass } from "class-transformer"
import { Requisite } from "./classes/requisites"
import { StructureCondition } from "./classes/structure_condition"

class RequisitesSimpleEngine extends Array<Requisite> {
  public hydrated: boolean = false

  constructor(requisites: unknown[]) {
    super()
    const members = requisites.map((member) => plainToClass(Requisite, member))
    this.push(...members)
  }

  async hydrate(): Promise<void> {
    for (const member of this) {
      await member.hydrate()
    }
    this.hydrated = true
  }
}

class StructureConditionEngine extends StructureCondition {
  public type: "static" | "dynamic"
  public hydrated: boolean = false

  constructor(structure?: object, type: "static" | "dynamic" = "static") {
    super()
    const structureParsed = plainToClass(StructureCondition, structure)
    this.condition = structureParsed.condition
    this.rules = structureParsed.rules
    this.type = type
  }

  async hydrate() {
    if (this.type === "static") {
      await super.hydrate()
    }
    this.hydrated = true
  }
}

export { RequisitesSimpleEngine, StructureConditionEngine }
