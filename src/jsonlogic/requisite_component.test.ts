import { Course } from "./entities/course"
import { RequisiteComponent } from "./requisite_component"

describe("Test util functions", () => {
  it("Test subclass routing for fromJsonLogic", () => {
    RequisiteComponent.fromJsonLogic("CPSC251")
    Course.fromJsonLogic("CPSC251")
  })
})
