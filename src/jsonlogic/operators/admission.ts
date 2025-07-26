import { RequisiteComponent } from "../requisite_component"
import { Faculty, FacultyEntity } from "../entities/faculty"
import { Department, DepartmentEntity } from "../entities/department"
import { Program, ProgramEntity } from "../entities/program"

export type AdmissionOperator = { admission: FacultyEntity | DepartmentEntity | ProgramEntity }

export class Admission extends RequisiteComponent<AdmissionOperator> {
  admission: Faculty | Department | Program

  static {
    RequisiteComponent.registerSubclass(this)
  }

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

  protected fromJsonLogic(json: AdmissionOperator): Admission {
    if (!Admission.isObject(json)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    const admissionEntity = RequisiteComponent.fromJsonLogic(json.admission)
    if (!(admissionEntity instanceof Faculty || admissionEntity instanceof Department || admissionEntity instanceof Program)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    return new Admission(admissionEntity)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (typeof json !== 'object' || !('admission' in json)) return false
    if (typeof json.admission !== 'object' || json.admission === null) return false
    return 'admission' in json && (Faculty.isObject(json.admission) || Department.isObject(json.admission) || Program.isObject(json.admission))
  }
}