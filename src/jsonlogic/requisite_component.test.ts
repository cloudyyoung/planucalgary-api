import { Course } from "./entities/course"
import { And } from "./operators/and"
import { RequisiteComponent } from "./requisite_component"
import "./entities"
import "./operators"

describe("Test util functions", () => {
  it("Test subclass routing for fromJsonLogic", () => {
    RequisiteComponent.fromJsonLogic("CPSC251")
    Course.fromJsonLogic("CPSC251")
    And.fromJsonLogic({
      and: [
        "CPSC251",
        "CPSC233",
      ]
    })
  })

  it('Test fromJsonLogic with valid JSON', () => {
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

    const result = RequisiteComponent.fromJsonLogic(json)
    expect(result).toBeInstanceOf(And)
    expect(result.toJsonLogic()).toEqual(json)
  })
})
