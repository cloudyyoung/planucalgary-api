
import { Entity, ProgramString } from "../entities/index"

export class Program extends Entity {
  program: ProgramString

  constructor(program: ProgramString) {
    super("program")

    this.program = program
  }

  toNaturalLanguage(): string {
    return `the program of ${this.program}`
  }

  toJsonLogic(): object | string {
    return {
      program: this.program,
    }
  }
    
  fromJsonLogic(json: object): Program {
    if (typeof json !== 'object' || json === null || !('program' in json)) {
      throw new Error(`Invalid JSON for "program" entity: ${JSON.stringify(json)}`)
    }
    return new Program((json as { program: ProgramString }).program)
  }
}
