import { CourseDocument } from "../api/catalog_courses/types"

export function courses(data: any, from: CourseDocument[], required: number): boolean {
  const count = from.length
  return count >= required
}

export function from(data: any, ...courses: (CourseDocument | null)[]) {
  return courses.filter(Boolean) as CourseDocument[]
}

export function course(data: { courses?: CourseDocument[] }, code: string) {
  const courses: CourseDocument[] = data.courses ? data.courses : []
  for (const course of courses) {
    if (course.code === code) {
      return course
    }
  }
  return null
}

export function units(data: { courses?: CourseDocument[] }, from: CourseDocument[] | null, required: number): boolean {
  let unitsCount = 0
  const coursesToCheck: CourseDocument[] = from || data.courses || []
  coursesToCheck.forEach((course) => {
    if (course && course.credits) {
      unitsCount += course.credits
    }
  })
  return unitsCount >= required
}

export function consent(data: any, ...consenter: any[]) {
  console.log("Consent of: " + (consenter.length > 0 ? consenter.join(", ") : "None"))
  return true
}

export function admission(data: any, ...admissionTo: any[]) {
  console.log("Admission to: " + (admissionTo.length > 0 ? admissionTo.join(", ") : "None"))
  return true
}

// for antireqs
export function and_to_or(data: any, ...args: any) {
  args.forEach((arg: any) => {
    if (arg) {
      return true
    }
  })
  return false
}
