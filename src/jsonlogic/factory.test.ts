import { Course } from "./entities/course"
import { Entity } from "./entities/entity"

describe("Test util functions", () => {
  it("Test a", () => {
    console.log(Entity.fromJsonLogic("CPSC251"))
    console.log(Course.fromJsonLogic("CPSC251"))
  })
})
