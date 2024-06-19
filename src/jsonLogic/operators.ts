import { StudentRecord, StudentRecordCourse } from "../api/accounts/types"
import { CoursesOperatorBody, JsonLogicCourse, UnitsOperatorBody } from "./interfaces"

export function course(this: StudentRecord, courseCode: string) {
  const studentCourses = this.courses
  for (const studentCourse of studentCourses) {
    if (studentCourse.code === courseCode) {
      return studentCourse
    }
  }
  return null
}

export function courses(this: StudentRecord, data: CoursesOperatorBody): boolean {
  const { required, from: fromCourses } = data
  const studentCourses = this.courses
  const matchingCourses = matchCourses(studentCourses, fromCourses)
  return matchingCourses.length >= required
}

export function units(this: StudentRecord, data: UnitsOperatorBody) {
  const { required, from: fromCourses } = data
  const studentCourses = this.courses
  const matchingCourses = matchCourses(studentCourses, fromCourses)
  const unitsCount = matchingCourses.reduce((total, course) => total + course.units, 0)
  return unitsCount >= required
}

function matchCourses(sr: StudentRecordCourse[], from?: JsonLogicCourse[]) {
  if (!from) return sr
  return from.map((frc) => sr.find((src) => src.code === frc.course)).filter(Boolean) as StudentRecordCourse[]
}

export function consent(...consenter: string[]) {
  console.log("Consent of: " + (consenter.length > 0 ? consenter.join(", ") : "None"))
  return true
}

export function admission(...admissionTo: string[]) {
  console.log("Admission to: " + (admissionTo.length > 0 ? admissionTo.join(", ") : "None"))
  return true
}

export function required(this: StudentRecord, required: number) {
  return { required: required }
}

export function from(this: StudentRecord, from: number) {
  return { from: from }
}
