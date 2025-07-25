import { Entity } from "../entities/entity"

export type ProgramString = string
export type ProgramEntity = { program: ProgramString }

/**
 * Represents a program entity.
 * This class extends the Entity class and provides methods to handle program-specific logic.
 * @format { program: ProgramString }
 */
export class Program extends Entity<ProgramEntity> {
  program_string: ProgramString

  constructor(program: ProgramString) {
    super("program")

    this.program_string = program
  }

  toNaturalLanguage(): string {
    return `the program of ${this.program_string}`
  }

  toJsonLogic(): ProgramEntity {
    return { program: this.program_string }
  }

  protected fromJsonLogic(json: ProgramEntity): Program {
    if (!Program.isEntity(json)) {
      throw new Error(`Invalid JSON for "program" entity: ${JSON.stringify(json)}`)
    }
    return new Program(json.program)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'program' in json
  }
}
