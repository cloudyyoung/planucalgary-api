import { fromJsonLogic, OperatorAndEntity } from "../factory"
import { Operator } from "./operator"

export type OrOperator = { or: (object | string)[] }

export class Or extends Operator<OrOperator> {
  or_arguments:  OperatorAndEntity<any>[]

  constructor(or_arguments: OperatorAndEntity<any>[]) {
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
    if (!Or.isEntity(json)) {
      throw new Error(`Invalid JSON for "or" operator: ${JSON.stringify(json)}`)
    }
    return new Or(
      json.or.map(arg => fromJsonLogic(arg))
    )
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('or' in json) || !Array.isArray(json.or)) return false
    return json.or.every(arg => Operator.isEntity(arg))
  }
}