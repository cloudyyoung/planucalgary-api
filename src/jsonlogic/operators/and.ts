import { Entity } from "../entities/index"
import { Operator } from "../operators/index"

export class And extends Operator {
  and_arguments: (Operator | Entity)[]

  constructor(and_arguments: (Operator | Entity)[]) {
    super("and")

    if (and_arguments.length < 2) {
      throw new Error(`"and" operator requires at least 2 arguments, got ${and_arguments.length}`)
    }

    this.and_arguments = and_arguments
  }

  toNaturalLanguage(): string {
    return this.and_arguments.map(arg => arg.toNaturalLanguage()).join(", and ")
  }

  toJsonLogic(): object | string {
    return {
      and: this.and_arguments.map(arg => {
        if (arg instanceof Operator) {
          return arg.toJsonLogic()
        }
        return arg
      }),
    }
  }

  fromJsonLogic(json: object | string): Operator {
    if (
      typeof json !== 'object' ||
      json === null ||
      !('and' in json) ||
      !Array.isArray(json.and)
    ) {
      throw new Error(`Invalid JSON for "and" operator: ${JSON.stringify(json)}`)
    }
    return new And(
      json.and.map(arg => Operator.fromJsonLogic(arg))
    )
  }
}
