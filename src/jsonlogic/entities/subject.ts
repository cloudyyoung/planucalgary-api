import { RequisiteComponent } from "../requisite"

export type SubjectCode = string
export type SubjectEntity = { subject: SubjectCode }

/**
 * Represents a subject entity.
 * This class extends the Entity class and provides methods to handle subject-specific logic.
 * @format { subject: SubjectCode }
 */
export class Subject extends RequisiteComponent<SubjectEntity> {
  subject_code: SubjectCode

  static {
    RequisiteComponent.registerSubclass(this)
  }

  constructor(subject: SubjectCode) {
    super("subject")

    this.subject_code = subject
  }

  toNaturalLanguage(): string {
    return `the subject of ${this.subject_code}`
  }

  toJsonLogic(): SubjectEntity {
    return { subject: this.subject_code }
  }

  protected fromJsonLogic(json: SubjectEntity): Subject {
    if (!Subject.isObject(json)) {
      throw new Error(`Invalid JSON for "subject" entity: ${JSON.stringify(json)}`)
    }
    return new Subject(json.subject)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'subject' in json
  }
}
