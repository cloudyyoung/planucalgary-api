import { fromJsonLogic, OperatorAndEntity } from "../factory"
import { Operator } from "./operator"

export type NotOperator = { not: object | string }

export class Not extends Operator<NotOperator> {
  not_argument: OperatorAndEntity<any>

  constructor(not_argument: OperatorAndEntity<any>) {
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
    if (!Not.isEntity(json)) {
      throw new Error(`Invalid JSON for "not" operator: ${JSON.stringify(json)}`)
    }
    return new Not(fromJsonLogic(json.not))
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('not' in json)) return false
    if (typeof json.not === 'string') return true
    if (typeof json.not !== 'object' || json.not === null) return false
    return Operator.isEntity(json.not) || typeof json.not === 'string'
  }
}