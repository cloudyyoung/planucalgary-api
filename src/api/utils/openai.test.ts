import { getSchema } from "../../jsonlogic/schema"
import { getRelatedData } from "./openai"

describe("openai", () => {
  it("get related data", async () => {
    const { subjects, faculties, departments } = await getRelatedData(
      "18 units of courses labelled Art History at the 300 level or above and consent of the Department.",
      "ART",
      "AR",
    )
    const subjectCodes = subjects.map((subject) => subject.code)
    const facultyCodes = faculties.map((faculty) => faculty.code)
    const departmentCodes = departments.map((department) => department.code)
    const schema = getSchema({ subjectCodes, facultyCodes, departmentCodes })

    console.error(schema)
  })
})
