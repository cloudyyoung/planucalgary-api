import { Entity, FieldString, LevelString, SubjectCode, FacultyCode, DepartmentCode } from "../entities/index"

export class DynamicCourse extends Entity {
  field?: FieldString
  level?: LevelString
  subject?: SubjectCode
  faculty?: FacultyCode
  department?: DepartmentCode

  constructor(
    field?: FieldString,
    level?: LevelString,
    subject?: SubjectCode,
    faculty?: FacultyCode,
    department?: DepartmentCode
  ) {
    super("dynamic_course")

    this.field = field
    this.level = level
    this.subject = subject
    this.faculty = faculty
    this.department = department
  }

  toNaturalLanguage(): string {
    const parts = []
    if (this.field) parts.push(`in the field of ${this.field}`)
    if (this.level) parts.push(`at the level of ${this.level}`)
    if (this.subject) parts.push(`in the subject of ${this.subject}`)
    if (this.faculty) parts.push(`offered by the faculty of ${this.faculty}`)
    if (this.department) parts.push(`offered by the department of ${this.department}`)

    return `courses ${parts.join(", ")}`
  }

  toJsonLogic(): object | string {
    const json_logic = {
      field: this.field,
      level: this.level,
      subject: this.subject,
      faculty: this.faculty,
      department: this.department,
    }
    return Object.fromEntries(Object.entries(json_logic).filter(([, value]) => value !== undefined))
  }

  fromJsonLogic(json: object): Entity {
    if (
      typeof json !== 'object' ||
      json === null
    ) {
      throw new Error(`Invalid JSON for "dynamic_course" operator: ${JSON.stringify(json)}`)
    }

    const field = 'field' in json ? json.field as FieldString : undefined
    const level = 'level' in json ? json.level as LevelString : undefined
    const subject = 'subject' in json ? json.subject as SubjectCode : undefined
    const faculty = 'faculty' in json ? json.faculty as FacultyCode : undefined
    const department = 'department' in json ? json.department as DepartmentCode : undefined

    return new DynamicCourse(
      field,
      level,
      subject,
      faculty,
      department
    )
  }
}