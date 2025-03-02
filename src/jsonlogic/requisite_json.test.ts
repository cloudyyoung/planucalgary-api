import { RequisiteJsonError, getValidator } from "./requisite_json"

describe("validator", () => {
  let validate: any

  beforeAll(async () => {
    validate = await getValidator()
  })

  it("validate course, truthy", async () => {
    const json = "CPSC217"
    const result = await validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate course, falsy", async () => {
    const json = "ABCD1237"
    const result = await validate(json)
    expect(result.valid).toBe(false)
  })

  it("validate and with two courses, truthy", async () => {
    const json = { and: ["CPSC217", "CPSC231"] }
    const result = await validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with two courses, truthy", async () => {
    const json = { and: ["ABCD222", "TTTT222"] }
    const result = await validate(json)
    expect(result.valid).toBe(false)
  })

  it("validate units with from, truthy", async () => {
    const json = {
      from: ["ENGG213", "COMS363", "SGMA217"],
      units: 3,
    }
    const result = await validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with two arguments of units, falsy", async () => {
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

    const t = async () => await validate(json, false)
    await expect(t()).rejects.toThrow(RequisiteJsonError)
  })

  it("validate and with two arguments of units + another or, truthy", async () => {
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

    const result = await validate(json)
    expect(result.valid).toBe(true)
  })

  it("validate and with only one argument, false", async () => {
    const json = {
      and: [
        {
          or: ["DRAM243"],
        },
      ],
    }

    const result = await validate(json)
    expect(result.valid).toBe(false)
  })
})
