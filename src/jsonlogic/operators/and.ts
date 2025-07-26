import { Entity } from "../entities/entity"
import { fromJsonLogic, OperatorAndEntity } from "../factory"
import { Operator } from "./operator"

export type AndOperator = { and: (object | string)[] }

export class And extends Operator<AndOperator> {
  and_arguments: OperatorAndEntity<any>[]

  constructor(and_arguments: OperatorAndEntity<any>[]) {
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
        if (arg instanceof Operator) {
          return arg.toJsonLogic()
        }
        return arg
      }),
    }
  }

  protected fromJsonLogic(json: AndOperator): And {
    if (!And.isEntity(json)) {
      throw new Error(`Invalid JSON for "and" operator: ${JSON.stringify(json)}`)
    }
    return new And(json.and.map(arg => fromJsonLogic(arg)))
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('and' in json) || !Array.isArray(json.and)) return false
    return json.and.every(arg => Operator.isEntity(arg) || Entity.isEntity(arg))
  }
}
