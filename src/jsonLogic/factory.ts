import JsonLogic from "json-logic-js"

function createJsonLogic(operators: { [key: string]: (...args: any[]) => any } = {}) {
  const jsonLogicInstance = Object.create(JsonLogic)

  Object.keys(operators).forEach((operator) => {
    jsonLogicInstance.add_operation(operator, operators[operator])
  })

  return jsonLogicInstance
}

export default createJsonLogic
