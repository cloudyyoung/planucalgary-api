import JsonLogic from "json-logic-js"
import { admission, consent, course, courses, units, required, from } from "./operators"
import { OperatorsDict } from "./utils"

const operators: OperatorsDict = {
  courses: courses,
  course: course,
  units: units,
  consent: consent,
  admission: admission,
  required: required,
  from: from,
}

Object.keys(operators).forEach((operator) => {
  JsonLogic.add_operation(operator, operators[operator])
})

export default JsonLogic
