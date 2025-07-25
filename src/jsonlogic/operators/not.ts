import { Operator } from "./operator"

export class Not extends Operator {
  not_argument: Operator

  constructor(not_argument: Operator) {
    super("not")
    this.not_argument = not_argument
  }

  toNaturalLanguage(): string {
    return `not ${this.not_argument.toNaturalLanguage()}`
  }

  toJsonLogic(): object | string {
    return {
      not: this.not_argument.toJsonLogic(),
    }
  }

  fromJsonLogic(json: object | string): Operator {
    if (
      typeof json === 'object' && !('not' in json)
    ) {
      throw new Error(`Invalid JSON for "not" operator: ${JSON.stringify(json)}`)
    } else if (typeof json === 'object' && json.not) {
      return new Not(Operator.fromJsonLogic(json.not))
    }
    return new Not(Operator.fromJsonLogic(json))
  }
}