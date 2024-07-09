export class CourseEnrolledError extends Error {
  constructor() {
    super("Course already enrolled")
    this.name = "CourseEnrolledError"
  }
}

export class CourseNotExistsError extends Error {
  constructor() {
    super("Course does not exist")
    this.name = "CourseNotExistsError"
  }
}
