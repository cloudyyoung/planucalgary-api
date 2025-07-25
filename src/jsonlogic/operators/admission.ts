import { Operator } from "./operator"
import { Faculty, FacultyEntity } from "../entities/faculty"
import { Department, DepartmentEntity } from "../entities/department"
import { Program, ProgramEntity } from "../entities/program"
import { Entity } from "../entities/entity"

export type AdmissionOperator = { admission: FacultyEntity | DepartmentEntity | ProgramEntity }

export class Admission extends Operator<AdmissionOperator> {
  admission: Faculty | Department | Program

  constructor(admission: Faculty | Department | Program) {
    super("admission")

    this.admission = admission
  }

  toNaturalLanguage(): string {
    return `admitted to ${this.admission.toNaturalLanguage()}`
  }

  toJsonLogic(): AdmissionOperator {
    return {
      admission: this.admission.toJsonLogic(),
    }
  }

  protected fromJsonLogic(json: AdmissionOperator): Operator<AdmissionOperator> {
    if (!Admission.isEntity(json)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    const admissionEntity = Entity.fromJsonLogic(json.admission)
    if (!(admissionEntity instanceof Faculty || admissionEntity instanceof Department || admissionEntity instanceof Program)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    return new Admission(admissionEntity)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (typeof json !== 'object' || !('admission' in json)) return false
    if (typeof json.admission !== 'object' || json.admission === null) return false
    return 'admission' in json && (Faculty.isEntity(json.admission) || Department.isEntity(json.admission) || Program.isEntity(json.admission))
  }
}