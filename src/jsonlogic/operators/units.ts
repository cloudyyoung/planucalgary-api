import { Operator } from "./operator"
import { Entity } from '../entities/entity'
import { fromJsonLogic } from "../factory"

export type UnitsOperator = { units: number, from?: Entity<any>[], not?: Entity<any>[] }

export class Units extends Operator<UnitsOperator> {
  units: number
  from?: Entity<any>[]
  not?: Entity<any>[]

  constructor(
    units: number,
    from?: Entity<any>[],
    not?: Entity<any>[]
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

  toJsonLogic(): UnitsOperator {
    const rule: UnitsOperator = { units: this.units }
    if (this.from) {
      rule.from = this.from.map(course => course.toJsonLogic())
    }
    if (this.not) {
      rule.not = this.not.map(course => course.toJsonLogic())
    }
    return rule
  }

  protected fromJsonLogic(json: UnitsOperator): Units {
    if (!Units.isEntity(json)) {
      throw new Error(`Invalid JSON for "units" operator: ${JSON.stringify(json)}`)
    }

    const units = json.units

    const from = json.from?.map((item: any) => {
      return fromJsonLogic(item) as Entity<any>
    })

    const not = json.not?.map((item: any) => {
      return fromJsonLogic(item) as Entity<any>
    })

    return new Units(units, from, not)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (!('units' in json) || typeof json.units !== 'number') return false
    if (!('from' in json) || !Array.isArray(json.from)) return false
    if (!('not' in json) || !Array.isArray(json.not)) return false
    return true
  }
}