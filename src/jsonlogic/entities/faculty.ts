import { Entity, FacultyCode } from "../entities/index"

export class Faculty extends Entity {
  faculty: FacultyCode

  constructor(faculty: FacultyCode) {
    super("faculty")

    this.faculty = faculty
  }

  toNaturalLanguage(): string {
    return `the faculty of ${this.faculty}`
  }

  toJsonLogic(): object | string {
    return {
      faculty: this.faculty,
    }
  }
    
  fromJsonLogic(json: object): Faculty {
    if (typeof json !== 'object' || json === null || !('faculty' in json)) {
      throw new Error(`Invalid JSON for "faculty" entity: ${JSON.stringify(json)}`)
    }
    return new Faculty((json as { faculty: FacultyCode }).faculty)
  }
}