import { prismaClient } from "../middlewares"

export type CourseCode = string
export type FacultyCode = string
export type DepartmentCode = string
export type ProgramString = string
export type YearString = "first" | "second" | "third" | "fourth" | "fifth"
export type SubjectCode = string
export type FieldString = string
export type LevelString = string

export type Operators = Units | And | Or | Not | Consent | Admission | Year
export type Units = {
  units: number
  from?: CourseCode[]
  exclude?: CourseCode[]
  field?: FieldString
  level?: LevelString
  subject?: SubjectCode
  faculty?: FacultyCode
  department?: DepartmentCode
}
export type And = {
  and: Operators[]
}
export type Or = {
  or: Operators[]
}
export type Not = {
  not: Operators
}
export type Consent = {
  consent: Faculty | Department
}
export type Admission = {
  admission: Faculty | Department | Program
}
export type Year = {
  year: YearString
}
export type Faculty = {
  faculty: FacultyCode
}
export type Department = {
  department: DepartmentCode
}
export type Program = {
  program: ProgramString
}

export interface RequisiteValidationError {
  message: string
  value: any
}

export const validate = async (json: any, safe: boolean = true) => {
  const subjects = await prismaClient.subject.findMany()
  const subjectCodes = subjects.map((subject) => subject.code)
  const faculties = await prismaClient.faculty.findMany()
  const facultyCodes = faculties.map((faculty) => faculty.code)
  const departments = await prismaClient.department.findMany()
  const departmentCodes = departments.map((department) => department.code)
  const courses = await prismaClient.course.findMany()
  const courseCodes = courses.map((course) => course.code)

  const is_object = (obj: object, key: string, isOnlyKey: boolean): boolean => {
    if (typeof obj !== "object") {
      return false
    }
    const keys = Object.keys(obj)
    if (isOnlyKey && keys.length !== 1) {
      return false
    }
    if (!keys.includes(key)) {
      return false
    }
    return true
  }

  const primitive_validators: Record<string, (obj: any) => boolean> = {
    course_code: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Course code must be a string", value: obj })
        return false
      }

      const valid = courseCodes.includes(obj)
      if (!valid) {
        errors.push({ message: "Course code does not exist", value: obj })
        return false
      }

      return true
    },
    level_string: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Level must be a string", value: obj })
        return false
      }

      const regex = /[0-9]{2,3}[+]?/
      const valid = regex.test(obj)
      if (!valid) {
        errors.push({ message: "Invalid level", value: obj })
        return false
      }

      return true
    },
    subject_code: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Subject code must be a string", value: obj })
        return false
      }

      const valid = subjectCodes.includes(obj)
      if (!valid) {
        errors.push({ message: "Subject code does not exist", value: obj })
        return false
      }

      return true
    },
    faculty_code: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Faculty code must be a string", value: obj })
        return false
      }

      const valid = facultyCodes.includes(obj)
      if (!valid) {
        errors.push({ message: "Faculty code does not exist", value: obj })
        return false
      }

      return true
    },
    department_code: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Department code must be a string", value: obj })
        return false
      }

      const valid = departmentCodes.includes(obj)
      if (!valid) {
        errors.push({ message: "Department code does not exist", value: obj })
        return false
      }

      return true
    },
    program_string: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Program must be a string", value: obj })
        return false
      }

      return true
    },
    year_string: (obj: object | string) => {
      if (typeof obj !== "string") {
        errors.push({ message: "Year must be a string", value: obj })
        return false
      }

      const options = ["first", "second", "third", "fourth", "fifth"]
      if (!options.includes(obj)) {
        errors.push({ message: "Invalid year", value: obj })
        return false
      }

      return true
    },
  }

  const operator_validators: Record<string, (obj: any) => boolean> = {
    and: (obj: And) => {
      if (!is_object(obj, "and", true)) {
        return false
      }

      const and_arguments = obj.and

      if (!Array.isArray(and_arguments)) {
        errors.push({ message: "'and' operator requires an array of arguments", value: obj })
        return false
      } else if (and_arguments.length < 2) {
        errors.push({ message: "'and' operator requires at least 2 arguments", value: obj })
        return false
      }

      return and_arguments.every(_validate)
    },
    or: (obj: Or) => {
      if (!is_object(obj, "or", true)) {
        return false
      }

      const or_arguments = obj.or

      if (!Array.isArray(or_arguments)) {
        errors.push({ message: "'or' operator requires an array of arguments", value: obj })
        return false
      } else if (or_arguments.length < 2) {
        errors.push({ message: "'or' operator requires at least 2 arguments", value: obj })
        return false
      }

      return or_arguments.every(_validate)
    },
    not: (obj: Not) => {
      if (!is_object(obj, "not", true)) {
        return false
      }

      const not_argument = obj.not

      if (typeof not_argument !== "object" || typeof not_argument !== "string") {
        errors.push({ message: "'not' operator requires a single argument", value: obj })
        return false
      }

      return _validate(not_argument)
    },
    units: (obj: Units) => {
      if (!is_object(obj, "units", false)) {
        return false
      }

      const units = obj.units
      if (typeof units !== "number") {
        errors.push({ message: "Property 'units' must be a number", value: obj })
        return false
      } else if (!Number.isInteger(units)) {
        errors.push({ message: "Property 'units' must be an integer", value: obj })
        return false
      }

      const from = obj.from
      if (from) {
        if (!Array.isArray(from)) {
          errors.push({ message: "Property 'from' must be an array", value: obj })
          return false
        } else if (!from.every(primitive_validators.course_code)) {
          errors.push({ message: "Property 'from' must be an array of courses", value: obj })
          return false
        }
      }

      const exclude = obj.exclude
      if (exclude) {
        if (!Array.isArray(exclude)) {
          errors.push({ message: "Property 'exclude' must be an array", value: obj })
          return false
        } else if (!exclude.every(primitive_validators.course_code)) {
          errors.push({ message: "Property 'exclude' must be an array of courses", value: obj })
          return false
        }
      }

      const field = obj.field
      if (field && typeof field !== "string") {
        errors.push({ message: "Property 'field' must be a string", value: obj })
        return false
      }

      const level = obj.level
      if (level) {
        if (typeof level !== "string") {
          errors.push({ message: "Property 'level' must be a string", value: obj })
          return false
        } else if (primitive_validators.level_string) {
          errors.push({ message: "Property 'level' must be a valid level", value: obj })
          return false
        }
      }

      const subject = obj.subject
      if (subject && !primitive_validators.subject_code(subject)) {
        errors.push({ message: "Property 'subject' must be a valid course code", value: obj })
        return false
      }

      const faculty = obj.faculty
      if (faculty && !primitive_validators.faculty_code(faculty)) {
        errors.push({ message: "Property 'faculty' must be a valid faculty code", value: obj })
        return false
      }

      const department = obj.department
      if (department && !primitive_validators.department_code(department)) {
        errors.push({ message: "Property 'department' must be a valid department code", value: obj })
        return false
      }

      return true
    },
    consent: (obj: Consent) => {
      if (!is_object(obj, "consent", true)) {
        return false
      }

      const consent = obj.consent
      if (typeof consent !== "object") {
        errors.push({ message: "Property 'consent' must be an object", value: obj })
        return false
      }

      const validObjects = [object_validators.faculty, object_validators.department]
      const object_validators_fns = Object.values(validObjects)
      const oneOf = object_validators_fns.some((validator) => validator(consent))

      if (!oneOf) {
        errors.push({ message: "Property 'consent' must be a valid faculty or department object", value: obj })
        return false
      }

      return _validate(consent)
    },
    admission: (obj: Admission) => {
      if (!is_object(obj, "admission", true)) {
        return false
      }

      const admission = obj.admission
      if (typeof admission !== "object") {
        errors.push({ message: "Property 'admission' must be an object", value: obj })
        return false
      }

      const validObjects = [object_validators.faculty, object_validators.department, object_validators.program]
      const object_validators_fns = Object.values(validObjects)
      const oneOf = object_validators_fns.some((validator) => validator(admission))

      if (!oneOf) {
        errors.push({
          message: "Property 'admission' must be a valid faculty, department, or program object",
          value: obj,
        })
        return false
      }

      return _validate(admission)
    },
    year: (obj: Year) => {
      if (!is_object(obj, "year", true)) {
        return false
      }

      const year = obj.year
      if (typeof year !== "string") {
        errors.push({ message: "Property 'year' must be a string", value: obj })
        return false
      }

      if (!primitive_validators.year_string(year)) {
        errors.push({ message: "Property 'year' must be a valid year", value: obj })
        return false
      }

      return true
    },
  }

  const object_validators: Record<string, (obj: any) => boolean> = {
    faculty: (obj: Faculty) => {
      if (!is_object(obj, "faculty", true)) {
        return false
      }

      const faculty_code = obj.faculty
      if (!primitive_validators.faculty_code(faculty_code)) {
        errors.push({ message: "Faculty code must be a valid faculty code", value: obj })
        return false
      }

      return true
    },
    department: (obj: Department) => {
      if (!is_object(obj, "department", true)) {
        return false
      }

      const department_code = obj.department
      if (!primitive_validators.department_code(department_code)) {
        errors.push({ message: "Department code must be a valid department code", value: obj })
        return false
      }

      return true
    },
    program: (obj: Program) => {
      if (!is_object(obj, "program", true)) {
        return false
      }

      const program_string = obj.program
      if (!primitive_validators.program_string(program_string)) {
        errors.push({ message: "Program must be a valid program string", value: obj })
        return false
      }

      return true
    },
  }

  const _validate = (obj: any): boolean => {
    if (typeof obj === "string") {
      return primitive_validators.course_code(obj)
    }

    if (typeof obj !== "object") {
      return false
    }

    const validatorFns = Object.values(operator_validators)
    const oneOf = validatorFns.some((validator) => validator(obj))
    return oneOf
  }

  const errors: RequisiteValidationError[] = []
  const result = _validate(json)

  if (safe === false && errors.length > 0) {
    throw new RequisiteJsonError(errors)
  }

  return result
}

export class RequisiteJsonError extends Error {
  errors: RequisiteValidationError[]

  constructor(errors: RequisiteValidationError[]) {
    const message =
      "Invalid JSON\n" + errors.map((error) => `- ${error.message}\n    ${JSON.stringify(error.value)}`).join("\n")
    super(message)
    this.name = "RequisiteJsonError"
    this.errors = errors
  }
}
