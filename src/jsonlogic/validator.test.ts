import { validate } from "./validator"

describe("validator", () => {
  it("should validate", async () => {
    const json = "CPSC217"
    const result = await validate(json)
    expect(result).toBe(true)
  })

  it("should validate", async () => {
    const json = { and: ["CPSC217", "CPSC231"] }
    const result = await validate(json)
    expect(result).toBe(true)
  })
})
