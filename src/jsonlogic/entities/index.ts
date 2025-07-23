export type CourseCode = string
export type FacultyCode = string
export type DepartmentCode = string
export type ProgramString = string
export type YearString = "first" | "second" | "third" | "fourth" | "fifth"
export type SubjectCode = string
export type FieldString = string
export type LevelString = string

export abstract class Entity { 
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): object | string;
  abstract fromJsonLogic(json: object | string): Entity;

  static fromJsonLogic(json: object | string): Entity {
    // try every subclass of Entity
    const entities = Object.values(this).filter(value => value instanceof Entity)
    for (const entity of entities) {
      try {
        return entity.fromJsonLogic(json)
      } catch (e) {
        // continue to the next entity if this one fails
      }
    }
    throw new Error(`No matching entity found for JSON: ${JSON.stringify(json)}`)
  }
}

