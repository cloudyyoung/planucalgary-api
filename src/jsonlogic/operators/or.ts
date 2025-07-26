import { RequisiteComponent } from "../requisite_component"

export type OrOperator = { or: (object | string)[] }

export class Or extends RequisiteComponent<OrOperator> {
  or_arguments: RequisiteComponent<any>[]
  
  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(or_arguments: RequisiteComponent<any>[]) {
    super("or")

    if (or_arguments.length < 2) {
      throw new Error(`"or" operator requires at least 2 arguments, got ${or_arguments.length}`)
    }

    this.or_arguments = or_arguments
  }

  toNaturalLanguage(): string {
    return this.or_arguments.map(arg => arg.toNaturalLanguage()).join(", or ")
  }

  toJsonLogic(): OrOperator {
    return {
      or: this.or_arguments.map(arg => arg.toJsonLogic()),
    }
  }

  protected fromJsonLogic(json: OrOperator): Or {
    if (!Or.isObject(json)) {
      throw new Error(`Invalid JSON for "or" operator: ${JSON.stringify(json)}`)
    }
    return new Or(
      json.or.map(arg => RequisiteComponent.fromJsonLogic(arg))
    )
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('or' in json) || !Array.isArray(json.or)) return false
    return json.or.every(arg => RequisiteComponent.isObject(arg))
  }
}