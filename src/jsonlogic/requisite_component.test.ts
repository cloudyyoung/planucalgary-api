import { Course } from "./entities/course"
import { And } from "./operators/and"
import { RequisiteComponent } from "./requisite_component"

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
})
