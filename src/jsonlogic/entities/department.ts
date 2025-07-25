import { Entity } from "../entities/index"

export type DepartmentCode = string
export interface DepartmentEntity {
  department: DepartmentCode
}

/**
 * Represents a department entity.
 * This class extends the Entity class and provides methods to handle department-specific logic.
 * @format { department: DepartmentCode }
*/
export class Department extends Entity {
  department: DepartmentCode

  constructor(department: DepartmentCode) {
    super("department")

    this.department = department
  }

  toNaturalLanguage(): string {
    return `the department of ${this.department}`
  }

  toJsonLogic(): DepartmentEntity {
    return {
      department: this.department,
    }
  }

  protected fromJsonLogic(json: object): Department {
    if (typeof json !== 'object' || json === null || !('department' in json)) {
      throw new Error(`Invalid JSON for "department" entity: ${JSON.stringify(json)}`)
    }
    return new Department((json as { department: DepartmentCode }).department)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'department' in json
  }
}