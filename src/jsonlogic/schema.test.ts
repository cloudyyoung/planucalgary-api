import { getHydratedSchema, ajv } from "./schema"

describe("schema", () => {
  it("valid a really simple json: course, truthy", async () => {
    const json = "CPSC217"
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    expect(validate.errors).toBeNull()
    const valid = validate(json)
    expect(valid).toBeTruthy()
  })

  it("valid a simple json: course, falsy", async () => {
    const json = "ABCD123"
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(valid).toBeFalsy()
  })

  it("valid a simple json: and with two courses, truthy", async () => {
    const json = { and: ["ACCT445", "ACCT357"] }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    console.error(validate.errors)
    expect(valid).toBeTruthy()
  })

  it("valid a simple json: and with two courses, falsy", async () => {
    const json = { and: ["ABCD123", "CDEF456"] }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(valid).toBeFalsy()
  })

  it("valid a simpler json, and with units + or, truthy", async () => {
    const json = {
      and: [
        {
          units: 24,
          subject: "CPSC",
        },
        {
          or: ["ACCT425", "ACCT357"],
        },
      ],
    }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).toBeNull()
    expect(valid).toBeTruthy()
  })

  it("valid a simpler json: and with units + units + or, falsy", async () => {
    const json = {
      and: [
        {
          units: 24,
          subject: "ABCD",
        },
        {
          units: 24,
          department: "XXXXXX",
        },
        {
          or: [true, "ACCT301"],
        },
      ],
    }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).not.toBeNull()
    expect(valid).toBeFalsy()
  })

  it("valid a complex json: and with units + consent [HERTD4]", async () => {
    const json = {
      and: [
        {
          units: 15,
          subject: "ART",
          department: "ART",
        },
        {
          consent: {
            faculty: "SC",
          },
        },
      ],
    }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).toBeNull()
    expect(valid).toBeTruthy()
  })

  it("valid a year json", async () => {
    const json = {
      year: "fourth",
    }
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).toBeNull()
    expect(valid).toBeTruthy()
  })

  it("valid a complex json: and with course + admission + consent", async () => {
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
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).toBeNull()
    expect(valid).toBeTruthy()
  })

  it("valid a complex json: and with units + consent", async () => {
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
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).toBeNull()
    expect(valid).toBeTruthy()
  })

  it("valid a complex json", async () => {
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
    const schema = await getHydratedSchema({ include_courses: true })
    const validate = ajv.compile(schema)
    const valid = validate(json)
    expect(validate.errors).not.toBeNull()
    expect(valid).toBeTruthy()
  })
})
