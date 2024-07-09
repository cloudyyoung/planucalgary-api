export class ProgramNotExistsError extends Error {
  constructor() {
    super("Program does not exists.")
    this.name = "ProgramNotExistsError"
  }
}

export class ProgramEnrolledError extends Error {
  constructor() {
    super("You are in the program already.")
    this.name = "ProgramEnrolledError"
  }
}