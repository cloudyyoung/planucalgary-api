import { Course } from "@prisma/client"
import { sum } from "lodash"

export type Operator = {
  name: string
  precedence?: number
  is_satisfied:  (logic: object | string, data: Data) => boolean
  is_rule: (logic: object | string) => boolean
}

export type Data = {
  courses: Course[]
}

export const RequisiteJsonLogic = {
  operators: {} as Record<string, Operator>,
  add_operator: (operator: Operator) => {
    RequisiteJsonLogic.operators[operator.name] = operator
    const sortedOperators = Object.values(RequisiteJsonLogic.operators).sort((a, b) => {
      return (b.precedence || 10) - (a.precedence || 10)
    })
    RequisiteJsonLogic.operators = Object.fromEntries(sortedOperators.map(op => [op.name, op]))
  },
  get_operator: (name: string) => {
    return RequisiteJsonLogic.operators[name]
  },
  is_satisfied: (logic: object | string, data: Data) => {
    return Object.values(RequisiteJsonLogic.operators).find(op => op.is_rule(logic))?.is_satisfied(logic, data)
  },
  is_rule: (logic: object | string) => Object.values(RequisiteJsonLogic.operators).some(op => op.is_rule(logic))
}

RequisiteJsonLogic.add_operator({
  name: 'and',
  is_satisfied: (logic: any, data: any) => logic.and.every((arg: any) => RequisiteJsonLogic.is_satisfied(arg, data)),
  is_rule: (logic: any) => logic && typeof logic === 'object' && Object.keys(logic).includes('and') && Array.isArray(logic.and) && logic.and.every((arg: any) => RequisiteJsonLogic.is_rule(arg) || typeof arg === 'string'),
})

RequisiteJsonLogic.add_operator({
  name: 'or',
  is_satisfied: (logic: any, data: any) => logic.or.some((arg: any) => RequisiteJsonLogic.is_satisfied(arg, data)),
  is_rule: (logic: any) => logic && typeof logic === 'object' && Object.keys(logic).includes('or') && Array.isArray(logic.or) && logic.or.every((arg: any) => RequisiteJsonLogic.is_rule(arg) || typeof arg === 'string'),
})

RequisiteJsonLogic.add_operator({
  name: 'not',
  is_satisfied: (logic: any, data: any) => !RequisiteJsonLogic.is_satisfied(logic.not, data),
  is_rule: (logic: any) => logic && typeof logic === 'object' && Object.keys(logic).includes('not') && RequisiteJsonLogic.is_rule(logic.not),
})

RequisiteJsonLogic.add_operator({
  name: 'course_code',
  is_satisfied: (logic: any, data: any) => {
    return typeof logic === 'string' && data.courses.includes(logic)
  },
  is_rule: (logic: any) => logic && typeof logic === 'string',
})

RequisiteJsonLogic.add_operator({
  name: 'units',
  is_satisfied: (logic: any, data: Data) => {
    const units: number = logic.units
    const from: string[] = logic.from || []
    const not: string[] = logic.not || []

    const satisfiedCourses: Course[] = []
    if (from.length > 0) {
      from.forEach(courseCode => {
        const course = data.courses.find(c => c.code === courseCode)
        if (course && !not.includes(course.code)) {
          satisfiedCourses.push(course)
        }
      })
    } else {
      data.courses.forEach(course => {
        if (!not.includes(course.code)) {
          satisfiedCourses.push(course)
        }
      })
    }

    const satisfiedUnits = sum(satisfiedCourses.map(course => course.units))

    return satisfiedUnits >= units
  },
  is_rule: (logic: any) => {
    if (!(logic && typeof logic === 'object')) return false

    if (Object.keys(logic).includes('from')) {
      if (
        !Array.isArray(logic.from)
        || logic.from.length === 0
        || !logic.from.every((course: any) => typeof course === 'string')
      ) return false
    }

    if (Object.keys(logic).includes('not')) {
      if (
        !Array.isArray(logic.not)
        || logic.not.length === 0
        || !logic.not.every((course: any) => typeof course === 'string')
      ) return false
    }

    return Object.keys(logic).includes('units') && typeof logic.units === 'number' 
  },
})

RequisiteJsonLogic.add_operator({
  name: 'admission',
  is_satisfied: () => true,
  is_rule: (logic: any) => logic && typeof logic === 'object' && Object.keys(logic).includes('admission') && typeof logic.admission === 'string',
})

RequisiteJsonLogic.add_operator({
  name: 'consent',
  is_satisfied: () => true,
  is_rule: (logic: any) => logic && typeof logic === 'object' && Object.keys(logic).includes('consent') && typeof logic.consent === 'string',
})

