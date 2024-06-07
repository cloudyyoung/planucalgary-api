import createJsonLogic from "./factory"
import { consent, course, courses, units, admission, from } from "./operators"

const operators = {
  from: from,
  courses: courses,
  course: course,
  units: units,
  consent: consent,
  admission: admission,
}

const preReqChecker = createJsonLogic(operators)

export default preReqChecker
