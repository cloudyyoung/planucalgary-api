import { getRelatedData } from "./openai"

describe("openai", () => {
  it("get related data", async () => {
    const data = await getRelatedData(
      "18 units of courses labelled Art History at the 300 level or above and consent of the Department.",
      "ART",
      "AR",
    )
    console.error(data)
  })
})
