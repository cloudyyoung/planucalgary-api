import { prismaClient } from "../middlewares"

export const validate = async (json: any) => {
  // const subjects = await prismaClient.subject.findMany()
  // const faculties = await prismaClient.faculty.findMany()
  // const departments = await prismaClient.department.findMany()
  const courses = await prismaClient.course.findMany()
  const courseCodes = courses.map((course) => course.code)

  const course = (obj: object | string) => {
    if (typeof obj !== "string") return false
    return courseCodes.includes(obj)
  }

  const schema: Record<string, (obj: any) => boolean> = {
    and: (obj: { and: any }) => {
      const premises = obj.and
      if (!Array.isArray(premises) || premises.length < 2) return false
      return premises.every(_validate)
    },
    or: (obj: { or: any }) => {
      const premises = obj.or
      if (!Array.isArray(premises) || premises.length < 2) return false
      return premises.some(_validate)
    },
    not: (obj: { not: any }) => {
      const premise = obj.not
      if (typeof premise !== "object" || typeof premise !== "string") return false
      return _validate(premise)
    },
    units: (obj: { units: number; from: string[] | undefined; exclude: string[] | undefined }) => {
      const units = obj.units
      if (typeof units !== "number") return false
      if (!Number.isInteger(units)) return false

      const from = obj.from
      if (from) {
        if (!Array.isArray(from)) return false
        if (!from.every(course)) return false
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

    if (!processor(obj)) {
      return false
    }

    return true
  }

  return _validate(json)
}
