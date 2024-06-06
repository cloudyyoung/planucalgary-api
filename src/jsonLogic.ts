import jsonLogic from "json-logic-js"
import { CatalogProgramDocument } from "./api/catalog_programs/types"
import { CourseDocument } from "./api/catalog_courses/types"

jsonLogic.add_operation("courses", function (data) {
  return data.courses ? data.courses : []
})

jsonLogic.add_operation("course", function (data, code, number) {
  let courses = jsonLogic.apply({ courses: [] }, data)
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].code === code && courses[i].number.startsWith(number)) {
      return courses[i]
    }
  }
  return null
})

jsonLogic.add_operation("units", function (data, ...courses) {
  let totalUnits = 0
  let flattenCourses: CourseDocument[] = courses.flat()
  flattenCourses.forEach((course) => {
    if (course && course.credits) {
      totalUnits += course.credits
    }
  })
  return totalUnits
})

jsonLogic.add_operation("consent", function (data, ...consenter) {
  console.log("Consent of: " + (consenter.length > 0 ? consenter.join(", ") : "None"))
  return true
})

jsonLogic.add_operation("program", function (data, ...conditionedPrograms) {
  const programs: CatalogProgramDocument[] = data.programs || []
  // how to access program components?
  // return programs.find((program) => conditionedPrograms.every((c) => program.components.includes(c))) || null
})

export default jsonLogic
