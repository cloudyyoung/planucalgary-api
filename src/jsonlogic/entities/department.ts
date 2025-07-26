import { RequisiteComponent } from "../requisite_component"

export type DepartmentCode = string
export type DepartmentEntity = { department: DepartmentCode }

/**
 * Represents a department entity.
 * This class extends the Entity class and provides methods to handle department-specific logic.
 * @format { department: DepartmentCode }
*/
export class Department extends RequisiteComponent<DepartmentEntity> {
  department_code: DepartmentCode

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(department: DepartmentCode) {
    super("department")

    this.department_code = department
  }

  toNaturalLanguage(): string {
    return `the department of ${this.department_code}`
  }

  toJsonLogic(): DepartmentEntity {
    return {
      department: this.department_code,
    }
  }

  protected fromJsonLogic(json: DepartmentEntity): Department {
    if (!Department.isObject(json)) {
      throw new Error(`Invalid JSON for "department" entity: ${JSON.stringify(json)}`)
    }
    return new Department(json.department)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'department' in json
  }
}