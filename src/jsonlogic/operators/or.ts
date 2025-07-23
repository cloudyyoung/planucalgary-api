import { Operator } from "../operators/index"

export class Or extends Operator {
  or_arguments: Operator[]

  constructor(or_arguments: Operator[]) {
    super("or")

    if (or_arguments.length < 2) {
      throw new Error(`"or" operator requires at least 2 arguments, got ${or_arguments.length}`)
    }

    this.or_arguments = or_arguments
  }

  toNaturalLanguage(): string {
    return this.or_arguments.map(arg => arg.toNaturalLanguage()).join(", or ")
  }

  toJsonLogic(): object | string {
    return {
      or: this.or_arguments.map(arg => arg.toJsonLogic()),
    }
  }

  fromJsonLogic(json: object | string): Operator {
    if (
      typeof json !== 'object' ||
      json === null ||
      !('or' in json) ||
      !Array.isArray(json.or)
    ) {
      throw new Error(`Invalid JSON for "or" operator: ${JSON.stringify(json)}`)
    }
    return new Or(
      json.or.map(arg => Operator.fromJsonLogic(arg))
    )
  }
}