import { RequisiteComponent } from "../requisite_component"

export type ProgramString = string
export type ProgramEntity = { program: ProgramString }

/**
 * Represents a program entity.
 * This class extends the Entity class and provides methods to handle program-specific logic.
 * @format { program: ProgramString }
 */
export class Program extends RequisiteComponent<ProgramEntity> {
  program_string: ProgramString

  static {
    RequisiteComponent.registerSubclass(this)
  }

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
    if (!Program.isObject(json)) {
      throw new Error(`Invalid JSON for "program" entity: ${JSON.stringify(json)}`)
    }
    return new Program(json.program)
  }

  protected isObject(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'program' in json
  }
}
