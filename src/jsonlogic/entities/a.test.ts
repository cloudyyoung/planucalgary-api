import { Entity } from "."
import { Course } from "./course"

describe("Test util functions", () => {
  it("Test a", () => {
    // Entity.fromJsonLogic("CPSC251")
    Course.fromJsonLogic("CPSC251")
  })
})
