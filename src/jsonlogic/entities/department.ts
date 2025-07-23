import { Entity, DepartmentCode } from "../entities/index"

export class Department extends Entity {
  department: DepartmentCode

  constructor(department: DepartmentCode) {
    super("department")

    this.department = department
  }

  toNaturalLanguage(): string {
    return `the department of ${this.department}`
  }

  toJsonLogic(): object | string {
    return {
      department: this.department,
    }
  }

  fromJsonLogic(json: object): Department {
    if (typeof json !== 'object' || json === null || !('department' in json)) {
      throw new Error(`Invalid JSON for "department" entity: ${JSON.stringify(json)}`)
    }
    return new Department((json as { department: DepartmentCode }).department)
  }
}