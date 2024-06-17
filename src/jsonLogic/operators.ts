import { CourseDocument } from "../api/catalog_courses/types"

export function courses(
  this: { courses: CourseDocument[] },
  data: { from?: { course: string }[]; required: number },
): boolean {
  const { from = [], required } = data
  const userCourses: CourseDocument[] = this.courses || []

  const matchingCourses: CourseDocument[] = from
    .map((courseItem) => userCourses.find((course) => course.code === courseItem.course))
    .filter((course): course is CourseDocument => !!course)

  return matchingCourses.length >= required
}

export function from(...courses: (CourseDocument | null)[]) {
  return courses.filter(Boolean) as CourseDocument[]
}

export function course(this: { courses: CourseDocument[] }, code: string) {
  const courses = this.courses
  for (const course of courses) {
    if (course.code === code) {
      return course
    }
  }
  return null
}

export function units(this: { courses: CourseDocument[] }, data: { from?: { course: string }[]; required: number }) {
  const { from, required } = data
  const userCourses: CourseDocument[] = this.courses || []
  let unitsCount = 0

  const coursesToCheck: CourseDocument[] =
    from && from.length
      ? from
          .map((courseItem: { course: string }) => userCourses.find((course) => course.code === courseItem.course))
          .filter((course: CourseDocument | undefined): course is CourseDocument => !!course)
      : userCourses

  unitsCount = coursesToCheck.reduce((total: number, course) => total + (course.credits || 0), 0)

  return unitsCount >= required
}

export function consent(...consenter: string[]) {
  console.log("Consent of: " + (consenter.length > 0 ? consenter.join(", ") : "None"))
  return true
}

export function admission(...admissionTo: string[]) {
  console.log("Admission to: " + (admissionTo.length > 0 ? admissionTo.join(", ") : "None"))
  return true
}

export function required(data: number) {
  return { required: data }
}
