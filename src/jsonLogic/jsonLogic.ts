import JsonLogic from "json-logic-js"
import { admission, consent, course, courses, from, required, units } from "./operators"

const operators: any = {
  from: from,
  courses: courses,
  course: course,
  units: units,
  consent: consent,
  admission: admission,
  required: required,
}

Object.keys(operators).forEach((operator) => {
  JsonLogic.add_operation(operator, operators[operator])
})

export default JsonLogic
