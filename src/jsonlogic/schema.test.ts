import Ajv from "ajv"
import { schema } from "./schema"

describe("schema", () => {
  const ajv = new Ajv()

  it("should be a valid schema", () => {
    expect(schema).toBeDefined()
    const validate = ajv.compile(schema)
    expect(validate).toBeDefined()
    expect(validate.errors).toBeNull()
  })

  it("valid a really simple json", () => {
    const json = "CPSC319"
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a simple json", () => {
    const json = { and: ["ACCT217", "ACCT301"] }
    const validate = ajv.compile(schema)
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a simpler json", () => {
    const json = {
      and: [
        {
          units: 24,
        },
        {
          or: ["ACCT217", "ACCT301"],
        },
      ],
    }
    const validate = ajv.compile(schema)
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a complex json", () => {
    const json = {
      and: [
        {
          units: 15,
          subject: "ESCI",
        },
        {
          consent: {
            faculty: "SC",
          },
        },
      ],
    }
    const validate = ajv.compile(schema)
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })
})
