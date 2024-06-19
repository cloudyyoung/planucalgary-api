import JsonLogic from "json-logic-js"
import { admission, consent, course, courses, units, required, from } from "./operators"

interface OperatorsDict {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any) => any
}

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
