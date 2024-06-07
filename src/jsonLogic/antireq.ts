import createJsonLogic from "./factory"
import { course, courses, units, from, and_to_or } from "./operators"

const operators = {
  from: from,
  courses: courses,
  course: course,
  units: units,
  and: and_to_or,
}

const antiReqChecker = createJsonLogic(operators)

export default antiReqChecker
