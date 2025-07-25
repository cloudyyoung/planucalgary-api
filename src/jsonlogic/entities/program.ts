import { Entity } from "../entities/index"

export type ProgramString = string
export interface ProgramEntity {
  program: ProgramString
}

/**
 * Represents a program entity.
 * This class extends the Entity class and provides methods to handle program-specific logic.
 * @format { program: ProgramString }
 */
export class Program extends Entity {
  program: ProgramString

  constructor(program: ProgramString) {
    super("program")

    this.program = program
  }

  toNaturalLanguage(): string {
    return `the program of ${this.program}`
  }

  toJsonLogic(): ProgramEntity {
    return {
      program: this.program,
    }
  }
    
  protected fromJsonLogic(json: object): Program {
    if (typeof json !== 'object' || json === null || !('program' in json)) {
      throw new Error(`Invalid JSON for "program" entity: ${JSON.stringify(json)}`)
    }
    return new Program((json as { program: ProgramString }).program)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'program' in json
  }
}
