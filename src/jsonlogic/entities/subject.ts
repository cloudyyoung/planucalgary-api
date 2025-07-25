import { Entity } from "../entities/entity"

export type SubjectCode = string
export type SubjectEntity = { subject: SubjectCode }

/**
 * Represents a subject entity.
 * This class extends the Entity class and provides methods to handle subject-specific logic.
 * @format { subject: SubjectCode }
 */
export class Subject extends Entity<SubjectEntity> {
  subject_code: SubjectCode

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
    if (!Subject.isEntity(json)) {
      throw new Error(`Invalid JSON for "subject" entity: ${JSON.stringify(json)}`)
    }
    return new Subject(json.subject)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'subject' in json
  }
}
