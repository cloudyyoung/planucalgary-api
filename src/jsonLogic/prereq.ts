import createJsonLogic from "./factory"
import { consent, course, courses, program, units } from "./operators"

const operators = {
  courses: courses,
  course: course,
  units: units,
  consent: consent,
  program: program,
}

const preReqChecker = createJsonLogic(operators)

export default preReqChecker
