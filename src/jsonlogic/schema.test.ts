import Ajv, { ValidateFunction } from "ajv"
import { getSchema } from "./schema"

describe("schema", () => {
  const ajv = new Ajv()
  let schema: any
  let validate: ValidateFunction

  beforeAll(async () => {
    schema = await getSchema()
    expect(schema).toBeDefined()
    validate = ajv.compile(schema)
    expect(validate).toBeDefined()
  })

  it("should be a valid schema", () => {
    expect(schema).toBeDefined()
    expect(ajv.validateSchema(schema)).toBeTruthy()
    const validate = ajv.compile(schema)
    expect(validate).toBeDefined()
    expect(validate.errors).toBeNull()
  })

  it("valid a really simple json", () => {
    const json = "CPSC319"
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a simple json", () => {
    const json = { and: ["ACCT217", "ACCT301"] }
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
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a year json", () => {
    const json = {
      year: "fourth",
    }
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a complex json", () => {
    const json = {
      and: [
        "KNES260",
        {
          admission: {
            faculty: "KN",
          },
        },
        {
          consent: {
            faculty: "KN",
          },
        },
      ],
    }
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a complex json", () => {
    const json = {
      and: [
        {
          level: "300+",
          units: 18,
          subject: "ARHI",
        },
        {
          consent: {
            department: "ART",
          },
        },
      ],
    }
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a complex json", () => {
    const json = {
      and: [
        {
          from: ["MATH249", "MATH265", "MATH275"],
          units: 3,
        },
        {
          or: [
            {
              units: 3,
              faculty: "SC",
            },
            {
              units: 3,
              faculty: "EN",
            },
          ],
        },
      ],
    }
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })
})
