import { double } from "aws-sdk/clients/lightsail"

export interface course {
  code: string
  number: string
  unit: double
  faculty: string
  departments: string[]
}

export interface courseData {
  subject_code: string
  course_number: string
  credits: double
  faculty_code: string
  departments: string[]
}
