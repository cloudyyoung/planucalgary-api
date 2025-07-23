import { Operator } from "../operators/index"
import { Faculty } from "../entities/faculty"
import { Department } from "../entities/department"
import { Program } from "../entities/program"
import { Entity } from "../entities"

export class Admission extends Operator {
  admission: Faculty | Department | Program

  constructor(admission: Faculty | Department | Program) {
    super("admission")

    this.admission = admission
  }

  toNaturalLanguage(): string {
    return `admitted to ${this.admission.toNaturalLanguage()}`
  }

  toJsonLogic(): object | string {
    return {
      admission: this.admission.toJsonLogic(),
    }
  }

  fromJsonLogic(json: object | string): Operator {
    if (typeof json !== 'object' || json === null || !('admission' in json)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    if (!(json.admission instanceof Object) && !(json.admission instanceof String)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    const admissionEntity = Entity.fromJsonLogic(json.admission)
    if (!(admissionEntity instanceof Faculty || admissionEntity instanceof Department || admissionEntity instanceof Program)) {
      throw new Error(`Invalid JSON for "admission" operator: ${JSON.stringify(json)}`)
    }

    return new Admission(admissionEntity)
  }
}