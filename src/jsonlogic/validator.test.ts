import { validate } from "./validator"

describe("validator", () => {
  it("validate course, truthy", async () => {
    const json = "CPSC217"
    const result = await validate(json)
    expect(result).toBe(true)
  })

  it("validate course, falsy", async () => {
    const json = "ABCD1237"
    const result = await validate(json)
    expect(result).toBe(false)
  })

  it("validate and with two courses, truthy", async () => {
    const json = { and: ["CPSC217", "CPSC231"] }
    const result = await validate(json)
    expect(result).toBe(true)
  })

  it("validate and with two courses, truthy", async () => {
    const json = { and: ["ABCD222", "TTTT222"] }
    const result = await validate(json)
    expect(result).toBe(false)
  })

  it("validate units with from, truthy", async () => {
    const json = {
      from: ["ENGG213", "COMS363", "SGMA217"],
      units: 3,
    }
    const result = await validate(json)
    expect(result).toBe(true)
  })
})
