import { RequisiteComponent } from "../requisite"

export type YearString = "first" | "second" | "third" | "fourth" | "fifth"
export type YearEntity = { year: YearString }

/**
 * Represents a year entity.
 * This class extends the Entity class and provides methods to handle year-specific logic.
 * @format { year: YearString }
 */
export class Year extends RequisiteComponent<YearEntity> {
  year_string: YearString

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(year: YearString) {
    super("year")

    this.year_string = year
  }

  toNaturalLanguage(): string {
    return `the year of ${this.year_string}`
  }

  toJsonLogic(): YearEntity {
    return { year: this.year_string }
  }

  protected fromJsonLogic(json: YearEntity): Year {
    if (!Year.isObject(json)) {
      throw new Error(`Invalid JSON for "year" entity: ${JSON.stringify(json)}`)
    }
    return new Year(json.year)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'year' in json
  }
}
