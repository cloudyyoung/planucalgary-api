import { Course } from "./entities/course"
import { RequisiteComponent } from "./requisite_component"

describe("Test util functions", () => {
  it("Test a", () => {
    console.log(RequisiteComponent.fromJsonLogic("CPSC251"))
    console.log(Course.fromJsonLogic("CPSC251"))
  })
})
