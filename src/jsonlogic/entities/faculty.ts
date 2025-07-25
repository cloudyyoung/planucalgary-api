import { Entity } from "../entities/entity"

export type FacultyCode = string
export interface FacultyEntity {
  faculty: FacultyCode
}

/**
 * Represents a faculty entity.
 * This class extends the Entity class and provides methods to handle faculty-specific logic.
 * @format { faculty: FacultyCode }
 */
export class Faculty extends Entity<FacultyEntity> {
  faculty: FacultyCode

  constructor(faculty: FacultyCode) {
    super("faculty")

    this.faculty = faculty
  }

  toNaturalLanguage(): string {
    return `the faculty of ${this.faculty}`
  }

  toJsonLogic(): FacultyEntity {
    return { faculty: this.faculty }
  }

  protected fromJsonLogic(json: FacultyEntity): Faculty {
    if (!Faculty.isEntity(json)) {
      throw new Error(`Invalid JSON for "faculty" entity: ${JSON.stringify(json)}`)
    }
    return new Faculty(json.faculty)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'faculty' in json
  }
}
