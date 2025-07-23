import { Entity, CourseCode } from "../entities/index"

export class Course extends Entity {
  course_code: CourseCode

  constructor(course_code: CourseCode) {
    super("course")
    this.course_code = course_code
  }

  toNaturalLanguage(): string {
    return this.course_code
  }

  toJsonLogic(): object | string {
    return this.course_code
  }
    
  fromJsonLogic(json: string): Course {
    if (typeof json !== 'string' || json === null) {
      throw new Error(`Invalid JSON for "course" entity: ${JSON.stringify(json)}`)
    }
    return new Course(json as CourseCode)
  }
}