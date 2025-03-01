import { prismaClient } from "../middlewares"

export const validate = async (json: any) => {
  // const subjects = await prismaClient.subject.findMany()
  // const faculties = await prismaClient.faculty.findMany()
  // const departments = await prismaClient.department.findMany()
  const courses = await prismaClient.course.findMany()
  const courseCodes = courses.map((course) => course.code)

  const course = (obj: string) => courseCodes.includes(obj)

  const schema: Record<string, (obj: object) => boolean> = {
    and: (obj) => {
      if (!Array.isArray(obj)) {
        return false
      }
      return obj.every(_validate)
    },
    or: (obj) => {
      if (!Array.isArray(obj)) {
        return false
      }
      return obj.some(_validate)
    },
    not: (obj) => {
      if (typeof obj !== "object") {
        return false
      }
      return _validate(obj)
    },
    units: (obj: any) => {
      const units = obj.units
      if (typeof units !== "number") {
        return false
      }
      return true
    },
  }

  const _validate = (obj: any): boolean => {
    if (typeof obj === "string") {
      return course(obj)
    }

    if (typeof obj !== "object") {
      return false
    }

    const keys = Object.keys(obj)
    const operators = Object.keys(schema)
    const matchedKey = operators.find((operator) => keys.includes(operator))

    if (!matchedKey) {
      return false
    }

    const processor = schema[matchedKey]
    if (!processor) {
      return false
    }

    if (!processor(obj[matchedKey])) {
      return false
    }

    return true
  }

  return _validate(json)
}
