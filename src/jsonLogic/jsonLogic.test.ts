import JsonLogic from "./jsonLogic"
import { course, courses } from "./operators"

describe("preReqChecker", () => {
  it("Basic test", () => {
    expect(JsonLogic.apply({ "==": [1, 1] })).toBe(true)
  })

  it("Two prereqs and satisfied", () => {
    const rule = {
      and: [{ course: "ACSC327" }, { course: "ACCT201" }],
    }
    const data = {
      courses: [
        {
          code: "ACSC327",
          name: "Life Contingencies I",
          credits: 3.0,
        },
        {
          code: "ACCT201",
          name: "FinAcctForNon-BusinessStudent",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Two prereqs and satisfied", () => {
    const rule = {
      and: [{ course: "ACSC327" }, { course: "ACCT201" }],
    }
    const data = {
      courses: [
        {
          code: "ACSC327",
          name: "Life Contingencies I",
          credits: 3.0,
        },
        {
          code: "ACCT201",
          name: "FinAcctForNon-BusinessStudent",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Two prereqs and not satisfied", () => {
    const rule = {
      and: [{ course: "ACSC327" }, { course: "ACCT201" }],
    }
    const data = {
      courses: [
        {
          code: "ACSC327",
          name: "Life Contingencies I",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Units required from courses and satisfied", () => {
    const rule = {
      and: [
        { course: "STAT323" },
        {
          units: {
            from: [{ course: "MATH311" }, { course: "MATH313" }, { course: "MATH367" }, { course: "MATH375" }],
            required: 6,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "STAT323",
          name: "Introduction to Theoretical Statistics",
          credits: 3.0,
        },
        {
          code: "MATH311",
          name: "Linear Methods II",
          credits: 3.0,
        },
        {
          code: "MATH313",
          name: "Linear Methods II",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Units required from courses and not satisfied", () => {
    const rule = {
      and: [
        { course: "STAT323" },
        {
          units: {
            from: [{ course: "MATH311" }, { course: "MATH313" }, { course: "MATH367" }, { course: "MATH375" }],
            required: 6,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "STAT323",
          name: "Introduction to Theoretical Statistics",
          credits: 3.0,
        },
        {
          code: "MATH311",
          name: "Linear Methods II",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Units required and satisfied", () => {
    const rule = {
      and: [
        {
          units: {
            from: [],
            required: 6,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "STAT323",
          name: "Introduction to Theoretical Statistics",
          credits: 3.0,
        },
        {
          code: "MATH311",
          name: "Linear Methods II",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Units required and not satisfied", () => {
    const rule = {
      and: [
        {
          units: {
            from: [],
            required: 6,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "STAT323",
          name: "Introduction to Theoretical Statistics",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Courses required from list and satisfied", () => {
    const rule = {
      and: [
        { course: "CHEM351" },
        {
          courses: {
            from: [{ course: "CHEM353" }, { course: "CHEM355" }],
            required: 1,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "CHEM351",
          name: "Organic Chemistry I",
          credits: 3.0,
        },
        {
          code: "CHEM353",
          name: "Organic Chemistry II",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Courses required from list and not satisfied", () => {
    const rule = {
      and: [
        { course: "CHEM351" },
        {
          courses: {
            from: [{ course: "CHEM353" }, { course: "CHEM355" }],
            required: 1,
          },
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "CHEM351",
          name: "Organic Chemistry I",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Complex structure satisfied", () => {
    const rule = {
      and: [
        { or: [{ course: "CHEM201" }, { course: "CHEM211" }] },
        { or: [{ course: "CHEM203" }, { course: "CHEM213" }] },
        { course: "CHEM351" },
      ],
    }
    const data = {
      courses: [
        {
          code: "CHEM201",
          name: "",
          credits: 3.0,
        },
        {
          code: "CHEM203",
          name: "",
          credits: 3.0,
        },
        {
          code: "CHEM351",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Complex structure not satisfied", () => {
    const rule = {
      and: [
        { or: [{ course: "CHEM201" }, { course: "CHEM211" }] },
        { or: [{ course: "CHEM203" }, { course: "CHEM213" }] },
        { course: "CHEM351" },
      ],
    }
    const data = {
      courses: [
        {
          code: "CHEM201",
          name: "",
          credits: 3.0,
        },
        {
          code: "CHEM203",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(false)
  })

  it("Consent", () => {
    const rule = {
      and: [
        { consent: "the Department" },
        {
          course: "CHEM203",
        },
      ],
    }
    const data = {
      courses: [
        {
          code: "CHEM203",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })

  it("Admission", () => {
    const rule = { and: [{ course: "MATH277" }, { admission: "a program in Engineering" }] }
    const data = {
      courses: [
        {
          code: "MATH277",
          name: "",
          credits: 3.0,
        },
      ],
    }
    expect(Boolean(JsonLogic.apply(rule, data))).toBe(true)
  })
})
