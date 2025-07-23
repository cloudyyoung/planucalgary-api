export abstract class Operator { 
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): object | string;
  abstract fromJsonLogic(json: object | string): Operator;

  static fromJsonLogic(json: object | string): Operator {
    // try every subclass of Operator
    const operators = Object.values(this).filter(value => value instanceof Operator)
    for (const operator of operators) {
      try {
        return operator.fromJsonLogic(json)
      } catch (e) {
        // continue to the next operator if this one fails
      }
    }
    throw new Error(`No matching operator found for JSON: ${JSON.stringify(json)}`)
  }
}

