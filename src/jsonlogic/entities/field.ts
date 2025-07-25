import { Entity } from "../entities/entity"

export type FieldString = string
export type FieldEntity = { field: FieldString }

/**
 * Represents a field entity.
 * This class extends the Entity class and provides methods to handle field-specific logic.
 * @format { field: FieldCode }
 */
export class Field extends Entity<FieldEntity> {
  field_code: FieldString

  constructor(field: FieldString) {
    super("field")

    this.field_code = field
  }

  toNaturalLanguage(): string {
    return `the field of ${this.field_code}`
  }

  toJsonLogic(): FieldEntity {
    return { field: this.field_code }
  }

  protected fromJsonLogic(json: FieldEntity): Field {
    if (!Field.isEntity(json)) {
      throw new Error(`Invalid JSON for "field" entity: ${JSON.stringify(json)}`)
    }
    return new Field(json.field)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'field' in json
  }
}
