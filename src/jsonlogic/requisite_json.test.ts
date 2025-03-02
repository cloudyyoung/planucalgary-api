import { RequisiteJsonError, ValidateResult, getValidator } from "./requisite_json"

describe("validator", () => {
  let validate: (json: any, safe?: boolean) => ValidateResult

  beforeAll(async () => {
    validate = await getValidator()
  })

  it("validate course, truthy", () => {
    const json = "CPSC217"
    const result = validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate course, falsy", () => {
    const json = "ABCD1237"
    const result = validate(json)
    expect(result.valid).toBe(false)
  })

  it("validate and with two courses, truthy", () => {
    const json = { and: ["CPSC217", "CPSC231"] }
    const result = validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with two courses, truthy", () => {
    const json = { and: ["ABCD222", "TTTT222"] }
    const result = validate(json)
    expect(result.valid).toBe(false)
  })

  it("validate units with from, truthy", () => {
    const json = {
      from: ["ENGG213", "COMS363", "SGMA217"],
      units: 3,
    }
    const result = validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with two arguments of units, falsy", () => {
    const json = {
      and: [
        {
          from: ["CPSC251", "MATH271", "MATH273"],
          units: 3,
        },
        {
          from: ["CPSC219", "CPSC233", "CPSC235", "ENCM335", "ENCM339", "ENSF337"],
          units: 3,
        },
      ],
    }

    const t = () => validate(json, false)
    expect(t).toThrow(RequisiteJsonError)
  })

  it("validate and with two arguments of units + another or, truthy", () => {
    const json = {
      and: [
        {
          from: ["DRAM210", "DRAM223", "DRAM225"],
          units: 12,
        },
        {
          or: ["DRAM242", "DRAM243"],
        },
      ],
    }

    const result = validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with only one argument, false", () => {
    const json = {
      and: [
        {
          or: ["DRAM243"],
        },
      ],
    }

    const result = validate(json)
    expect(result.valid).toBe(false)
  })

  it("validate year, truthy", () => {
    const json = {
      and: [
        {
          year: "third",
        },
        {
          consent: {
            faculty: "AR",
          },
        },
      ],
    }

    const result = validate(json, false)
    expect(result.valid).toBe(true)
  })
})
