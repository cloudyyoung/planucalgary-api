import { Operator } from "./operator"
import { Faculty, FacultyEntity } from "../entities/faculty"
import { Department, DepartmentEntity } from "../entities/department"
import { Entity } from "../entities/entity"

export type ConsentOperator = { consent: FacultyEntity | DepartmentEntity }

export class Consent extends Operator<ConsentOperator> {
  consent: Faculty | Department

  constructor(consent: Faculty | Department) {
    super("consent")

    this.consent = consent
  }

  toNaturalLanguage(): string {
    return `the consent of ${this.consent.toNaturalLanguage()}`
  }

  toJsonLogic(): ConsentOperator {
    return {
      consent: this.consent.toJsonLogic(),
    }
  }

  protected fromJsonLogic(json: ConsentOperator): Consent {
    if (!Consent.isEntity(json)) {
      throw new Error(`Invalid JSON for "consent" operator: ${JSON.stringify(json)}`)
    }

    const consentEntity = Entity.fromJsonLogic(json.consent)

    if (!(consentEntity instanceof Faculty || consentEntity instanceof Department)) {
      throw new Error(`Invalid JSON for "consent" operator: ${JSON.stringify(json)}`)
    }

    return new Consent(consentEntity)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    if (typeof json !== 'object' || !('consent' in json)) return false
    if (typeof json.consent !== 'object' || json.consent === null) return false
    if (!('consent' in json)) return false
    if (typeof json.consent !== 'object' || json.consent === null) return false
    return 'consent' in json && (Faculty.isEntity(json.consent) || Department.isEntity(json.consent))
  }
}