import { RequisiteComponent } from "../requisite_component"

export type NotOperator = { not: object | string }

export class Not extends RequisiteComponent<NotOperator> {
  not_argument: RequisiteComponent<any>

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(not_argument: RequisiteComponent<any>) {
    super("not")
    this.not_argument = not_argument
  }

  toNaturalLanguage(): string {
    return `not ${this.not_argument.toNaturalLanguage()}`
  }

  toJsonLogic(): NotOperator {
    return {
      not: this.not_argument.toJsonLogic(),
    }
  }

  protected fromJsonLogic(json: NotOperator): Not {
    if (!Not.isObject(json)) {
      throw new Error(`Invalid JSON for "not" operator: ${JSON.stringify(json)}`)
    }
    return new Not(RequisiteComponent.fromJsonLogic(json.not))
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('not' in json)) return false
    if (typeof json.not === 'string') return true
    if (typeof json.not !== 'object' || json.not === null) return false
    return RequisiteComponent.isObject(json.not) || typeof json.not === 'string'
  }
}