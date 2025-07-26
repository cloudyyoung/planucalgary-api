import { RequisiteComponent } from "../requisite_component"

export type AndOperator = { and: (object | string)[] }

export class And extends RequisiteComponent<AndOperator> {
  and_arguments: RequisiteComponent<any>[]

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(and_arguments: RequisiteComponent<any>[]) {
    super("and")

    if (and_arguments.length < 2) {
      throw new Error(`"and" operator requires at least 2 arguments, got ${and_arguments.length}`)
    }

    this.and_arguments = and_arguments
  }

  toNaturalLanguage(): string {
    return this.and_arguments.map(arg => arg.toNaturalLanguage()).join(", and ")
  }

  toJsonLogic(): AndOperator {
    return {
      and: this.and_arguments.map(arg => {
        if (arg instanceof RequisiteComponent) {
          return arg.toJsonLogic()
        }
        return arg
      }),
    }
  }

  protected fromJsonLogic(json: AndOperator): And {
    if (!And.isObject(json)) {
      throw new Error(`Invalid JSON for "and" operator: ${JSON.stringify(json)}`)
    }
    return new And(json.and.map(arg => RequisiteComponent.fromJsonLogic(arg)))
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('and' in json) || !Array.isArray(json.and)) return false
    return json.and.every(arg => RequisiteComponent.isObject(arg))
  }
}
