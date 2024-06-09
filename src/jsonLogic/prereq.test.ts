import preReqChecker from "./prereq"
import JsonLogic from "json-logic-js"

describe("preReqChecker", () => {
  it("Basic test", () => {
    expect(JsonLogic.apply({ "==": [1, 1] })).toBe(true)
  })

  it("Two prereqs and satisfied", () => {
    const rule = {
      if: [{ and: [{ course: [{ var: "" }, "ACSC327"] }, { course: [{ var: "" }, "ACCT201"] }] }, true, false],
    }
    const data = {
      courses: [
        // {
        //   coursedog_id: "1000901-2020-07-01",
        //   cid: "100090",
        //   course_group_id: "1000901",
        //   code: "ACSC327",
        //   subject_code: "ACSC",
        //   course_number: "327",
        //   name: "Life Contingencies I",
        //   long_name: "Life Contingencies I",
        //   topics: [],
        //   faculty_code: "SC",
        //   faculty_name: "Faculty of Science",
        //   departments: ["MTST"],
        //   department_ownership: [{ deptId: "MTST", percentOwnership: 100 }],
        //   career: "Undergraduate Programs",
        //   description:
        //     "The survival function, force of mortality, life tables, analytical laws of mortality, life insurance, continuous and discrete life annuities, recursion equations. Introduction to benefit premiums and/or insurance and annuity models with interest as a random variable as time permits.",
        //   prereq: "Statistics 321.",
        //   coreq: null,
        //   antireq: null,
        //   notes: null,
        //   aka: null,
        //   requisites: {
        //     requisitesSimple: [
        //       {
        //         id: "bItdgwGr",
        //         name: "Prerequisite(s):",
        //         type: "Prerequisite",
        //         showInCatalog: true,
        //         rules: [
        //           {
        //             id: "aftu22Qo",
        //             condition: "minimumCredits",
        //             value: {
        //               condition: "courses",
        //               values: [{ value: ["1627891"], logic: "and" }],
        //               id: "ElGkSCjV",
        //               subSelections: [],
        //             },
        //             name: "Statistics 321.",
        //             credits: 3,
        //           },
        //         ],
        //         sisId: "",
        //       },
        //     ],
        //   },
        //   credits: 3.0,
        //   grade_mode: "GRD - Graded",
        //   components: ["LEC", "TUT"],
        //   nogpa: false,
        //   repeatable: false,
        //   active: true,
        //   start_term: { year: "2020", id: "2207", semester: 7 },
        //   created_at: 1691444015396,
        //   last_edited_at: 1714130423099,
        //   effective_start_date: "2020-07-01",
        //   effective_end_date: null,
        //   version: 5,
        // },
        {
          coursedog_id: "1000031-1977-04-30",
          cid: "100003",
          course_group_id: "1000031",
          code: "ACCT201",
          subject_code: "ACCT",
          course_number: "201",
          name: "FinAcctForNon-BusinessStudent",
          long_name: "Fin Acct For Non-Business Student",
          topics: [],
          faculty_code: "HA",
          faculty_name: "Haskayne School of Business",
          departments: ["HA"],
          department_ownership: {},
          career: "Undergraduate Programs",
          description: "No description available",
          prereq: null,
          coreq: null,
          antireq: null,
          notes: null,
          aka: null,
          requisites: {},
          credits: 3.0,
          grade_mode: "GRD - Graded",
          components: ["SEC"],
          nogpa: false,
          repeatable: false,
          active: false,
          start_term: { year: "1977", id: "0773", semester: 3 },
          created_at: 1691444015396,
          last_edited_at: 1714130423099,
          effective_start_date: "1977-04-30",
          effective_end_date: null,
          version: 2,
        },
      ],
    }
    expect(preReqChecker.apply(rule, data)).toBe(false)
  })
})
