import { CourseDocument } from "../api/catalog_courses/types"
import { CatalogProgramDocument } from "../api/catalog_programs/types"

export function courses(data: any) {
  return data.courses ? data.courses : []
}

export function course(data: any, code: string, number: string) {
  let courses = data.courses ? data.courses : []
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].code === code && courses[i].number.startsWith(number)) {
      return courses[i]
    }
  }
  return null
}

export function units(data: any, ...courses: any[]) {
  let totalUnits = 0
  let flattenCourses: CourseDocument[] = courses.flat()
  flattenCourses.forEach((course) => {
    if (course && course.credits) {
      totalUnits += course.credits
    }
  })
  return totalUnits
}

export function consent(data: any, ...consenter: any[]) {
  console.log("Consent of: " + (consenter.length > 0 ? consenter.join(", ") : "None"))
  return true
}

export function program(data: any, ...conditionedPrograms: any[]) {
  const programs: CatalogProgramDocument[] = data.programs || []
  // how to access program components?
  // return programs.find((program) => conditionedPrograms.every((c) => program.components.includes(c))) || null
}
