import { Operator } from "../operators/index"
import { Faculty } from "../entities/faculty"
import { Department } from "../entities/department"
import { Entity } from "../entities"

export class Consent extends Operator {
  consent: Faculty | Department

  constructor(consent: Faculty | Department) {
    super("consent")

    this.consent = consent
  }

  toNaturalLanguage(): string {
    return `the consent of ${this.consent.toNaturalLanguage()}`
  }

  toJsonLogic(): object | string {
    return {
      consent: this.consent.toJsonLogic(),
    }
  }

  fromJsonLogic(json: object | string): Operator {
    if (typeof json !== 'object' || json === null || !('consent' in json)) {
      throw new Error(`Invalid JSON for "consent" operator: ${JSON.stringify(json)}`)
    }

    if (!(json.consent instanceof Object) && !(json.consent instanceof String)) {
      throw new Error(`Invalid JSON for "consent" operator: ${JSON.stringify(json)}`)
    }

    const consentEntity = Entity.fromJsonLogic(json.consent)
    if (!(consentEntity instanceof Faculty || consentEntity instanceof Department)) {
      throw new Error(`Invalid JSON for "consent" operator: ${JSON.stringify(json)}`)
    }

    return new Consent(consentEntity)
  }
}