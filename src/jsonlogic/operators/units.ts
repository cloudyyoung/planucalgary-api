import { Operator } from "../operators/index"
import { Entity } from '../entities/index'

export class Units extends Operator  {
  units: number
  from?: Entity[]
  not?: Entity[]

  constructor(
    units: number,
    from?: Entity[],
    not?: Entity[]
  ) {
    super("units")

    this.units = units
    this.from = from
    this.not = not
  }

  toNaturalLanguage(): string {
    let description = `at least ${this.units} units`
    if (this.from) {
      const fromCourses = this.from.map(course => course.toNaturalLanguage()).join(", ")
      description += ` from ${fromCourses}`
    }
    if (this.not) {
      const notCourses = this.not.map(course => course.toNaturalLanguage()).join(", ")
      description += `, excluding ${notCourses}`
    }
    return description
  }

  toJsonLogic(): object | string {
    const rule: any = { units: this.units }
    if (this.from) {
      rule.from = this.from.map(course => course.toJsonLogic())
    }
    if (this.not) {
      rule.not = this.not.map(course => course.toJsonLogic())
    }
    return rule
  }

  fromJsonLogic(json: object | string): Operator {
    if (
      typeof json !== 'object' ||
      json === null ||
      !('units' in json) ||
      typeof json.units !== 'number' ||
      !('from' in json) ||
      !Array.isArray(json.from) ||
      !('not' in json) ||
      !Array.isArray(json.not)
    ) {
      throw new Error(`Invalid JSON for "units" operator: ${JSON.stringify(json)}`)
    }

    const units = json.units

    const from: Entity[] = []
    json.from.forEach((item: any) => {
      from.push(Entity.fromJsonLogic(item))
    })

    const not: Entity[] = []
    json.not.forEach((item: any) => {
      not.push(Entity.fromJsonLogic(item))
    })

    return new Units(units, from, not)
  }
}