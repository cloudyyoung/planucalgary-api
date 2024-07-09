export class InvalidCredentialsError extends Error {
  constructor() {
    super()
    this.name = "InvalidCredentialsError"
    this.message = "Invalid credentials provided for authentication."
  }
}

export class UsernameExistsError extends Error {
  constructor() {
    super()
    this.name = "UsernameExistsError"
    this.message = "Username already exists."
  }
}

export class EmailExistsError extends Error {
  constructor() {
    super()
    this.name = "EmailExistsError"
    this.message = "Email already exists."
  }
}
