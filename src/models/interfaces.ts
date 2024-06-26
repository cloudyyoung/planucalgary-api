import { double } from "aws-sdk/clients/lightsail"
import { Account } from "./interfaces.gen"

export type course = {
  code: string
  number: string
  unit: double
  faculty: string
  departments: string[]
}

export type courseData = {
  subject_code: string
  course_number: string
  credits: double
  faculty_code: string
  departments: string[]
}

interface CourseCondition {
  value: string[]
  logic: string
}

interface CourseValues {
  condition: string
  values: CourseCondition[]
  id: string
  subSelections: unknown[]
}

interface Rule {
  id: string
  condition: string
  value: CourseValues
  restriction: number
  name: string
}

export interface RequisiteList {
  id: string
  name: string
  type: string
  showInCatalog: boolean
  rules: Rule[]
  sisId: string
}

export default interface JwtContent {
  payload: content
  exp: number
  iat: number
}

interface content {
  user: Account
}

export interface CourseId {
  id: string
  term: object
}
