import { RequisiteComponent } from "../requisite"

export type CourseCode = string

const UntrackedCourseRegex = /^([A-Za-z ,']+) ([0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?)$/
const TrackedCourseRegex = /^([A-Z]{3,4})[0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?$/

/**
 * Represents a course entity.
 * This class extends the Entity class and provides methods to handle course-specific logic.
 * @format "CourseCode"
 */
export class Course extends RequisiteComponent<CourseCode> {
  course_code: CourseCode

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(course_code: CourseCode) {
    super("course")
    this.course_code = course_code
  }

  toNaturalLanguage(): string {
    return this.course_code
  }

  toJsonLogic(): CourseCode {
    return this.course_code
  }
    
  protected fromJsonLogic(json: CourseCode): Course {
    if (Course.isObject(json) === false) {
      throw new Error(`Invalid JSON for "course" entity: ${JSON.stringify(json)}`)
    }
    return new Course(json as CourseCode)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'string') return false
    const courseCode = json as string
    return UntrackedCourseRegex.test(courseCode) || TrackedCourseRegex.test(courseCode)
  }
}
