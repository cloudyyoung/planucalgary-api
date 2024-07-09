import JsonLogic from "./jsonLogic"

describe("antiReqChecker", () => {
  it("Two antiReq, satisfies one", () => {
    const rule = { or: [{ course: "CPSC572" }, { or: [{ course: "CPSC599.77" }, { course: "CPSC672" }] }] }
    const data = {
      courses: [
        {
          code: "CPSC599.77",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Two antiReq, not satisfies", () => {
    const rule = { or: [{ course: "CPSC572" }, { or: [{ course: "CPSC599.77" }, { course: "CPSC672" }] }] }
    const data = {
      courses: [
        {
          code: "CPSC351",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Multiple antireqs from a list, satisfied one", () => {
    const rule = {
      or: [
        { course: "DATA211" },
        {
          courses: {
            from: [
              { course: "CPSC215" },
              { course: "CPSC217" },
              { course: "CPSC231" },
              { course: "CPSC235" },
              { course: "ENCM339" },
              { course: "ENGG233" },
            ],
            required: 1,
          },
        },
        { course: "ENDG233" },
      ],
    }
    const data = {
      courses: [
        {
          code: "CPSC235",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Multiple antireqs from a list, not satisfied", () => {
    const rule = {
      or: [
        { course: "DATA211" },
        {
          courses: {
            from: [
              { course: "CPSC215" },
              { course: "CPSC217" },
              { course: "CPSC231" },
              { course: "CPSC235" },
              { course: "ENCM339" },
              { course: "ENGG233" },
            ],
            required: 1,
          },
        },
        { course: "ENDG233" },
      ],
    }
    const data = {
      courses: [
        {
          code: "CPSC559",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })
})
