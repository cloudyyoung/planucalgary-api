import { RequisiteComponent } from "../requisite_component"

export type FacultyCode = string
export type FacultyEntity = { faculty: FacultyCode }

/**
 * Represents a faculty entity.
 * This class extends the Entity class and provides methods to handle faculty-specific logic.
 * @format { faculty: FacultyCode }
 */
export class Faculty extends RequisiteComponent<FacultyEntity> {
  faculty_code: FacultyCode

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(faculty: FacultyCode) {
    super("faculty")

    this.faculty_code = faculty
  }

  toNaturalLanguage(): string {
    return `the faculty of ${this.faculty_code}`
  }

  toJsonLogic(): FacultyEntity {
    return { faculty: this.faculty_code }
  }

  protected fromJsonLogic(json: FacultyEntity): Faculty {
    if (!Faculty.isObject(json)) {
      throw new Error(`Invalid JSON for "faculty" entity: ${JSON.stringify(json)}`)
    }
    return new Faculty(json.faculty)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'faculty' in json
  }
}
