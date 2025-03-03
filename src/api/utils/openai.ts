import OpenAI from "openai"

import { OPENAI_API_KEY } from "../../config"
import { prismaClient } from "../../middlewares"
import { Department, Faculty, Subject } from "@prisma/client"
import { cleanup } from "../../jsonlogic/utils"
import { getSchema } from "../../jsonlogic/schema"

export const OpenAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export default OpenAIClient

export async function generatePrereq(req: string, department: string, faculty: string, n: number): Promise<string[]> {
  const reqCleaned = req.replace("Prerequisite or Corequisite: ", "")

  const { subjects, faculties, departments } = await getRelatedData(reqCleaned, department, faculty)

  const systemPrompt = getSystemPrompt(subjects, faculties, departments)
  const userPrompt = getUserPrompt(reqCleaned, department, faculty)
  const responseFormat = getResponseFormat()

  const response = await OpenAIClient.chat.completions.create({
    model: "gpt-4o",
    n: n,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    response_format: responseFormat,
  })

  const contents = []

  for (const completion of response.choices) {
    if (completion.message.content === null) {
      continue
    }

    try {
      const content = JSON.parse(completion.message.content.trim())
      const obj = content["requisite"]
      const cleaned = cleanup(obj)
      contents.push(cleaned)
    } catch (e) {
      console.error(e)
      continue
    }
  }

  return contents
}

export const getRelatedData = async (req: string, department?: string, faculty?: string) => {
  let reqCleaned = req.replace("Prerequisite or Corequisite: ", "")

  const [subjects, faculties, departments] = await Promise.all([
    prismaClient.subject.findMany(),
    prismaClient.faculty.findMany(),
    prismaClient.department.findMany(),
  ])

  const relatedSubjects = []
  const sortedSubjects = subjects.sort((a, b) => b.title.length - a.title.length)

  for (const subject of sortedSubjects) {
    if (reqCleaned.includes(subject.title)) {
      relatedSubjects.push(subject)
      reqCleaned = reqCleaned.replace(subject.title, subject.code)
    }
  }

  const relatedFaculties = faculties.filter((faculty) => reqCleaned.includes(faculty.display_name))
  const relatedDepartments = departments.filter((department) => reqCleaned.includes(department.name))

  const extraFaculty = faculties.find((faculty_obj) => faculty_obj.code === faculty)
  const extraDepartment = departments.find((department_obj) => department_obj.code === department)

  if (extraFaculty) {
    relatedFaculties.push(extraFaculty)
  }

  if (extraDepartment) {
    relatedDepartments.push(extraDepartment)
  }

  return {
    subjects: relatedSubjects,
    faculties: relatedFaculties,
    departments: relatedDepartments,
  }
}

const getResponseFormat = () => {
  return getSchema()
}

const getSystemPrompt = (subjects: Subject[], faculties: Faculty[], departments: Department[]) => {
  return `
You are an advanced admission bot for a university tasked with processing course prerequisites for use in a structured database. Your job is to:
  1. Input: Take course information and a textual description of its prerequisites.
  2. Output: Convert the prerequisites into a JSON format with the following structure:
    - Use subject code names for courses (e.g., "MATH" instead of "Mathematics").
    - But if there is no corresponding subject code you may use, reserve the original course name as it is. (e.g., "Newjeans and Bunnies Club 499" has no corresponding subject code, so it should be kept as is).
    - Use faculty code names for faculties (e.g., "HA" instead of "Haskayne School of Business").
    - Use department code names for departments (e.g., "CPSC" instead of "Computer Science").
    - Avoid deeply nested logical structures for readability.
    - Simplify logical expressions wherever possible without losing meaning.
    - Ensure no requirement has "units" equal to 0, because it does not make sense to have a course with 0 units.
  3. Rules:
    - Represent logical prerequisites clearly in JSON format using keys like "and" or "or".
    - Flatten unnecessary nesting of conditions to make the JSON more concise.
    - Handle exceptions gracefully by assuming ambiguous text needs clarification and simplifying to the most likely structure.
    - Try to use the logical operators you are provided with to represent the prerequisites as accurately as possible.
  4. Examples:
    Input Text: "Mathematics 101, Newjeans and Bunnies Club 499, and Physics 201 or Chemistry 102A"
    Output JSON:
      \`\`\`json
      {
        "and": [
          "MATH101",
          "Newjeans and Bunnies Club 499",
          {
            "or": [
              "PHYS201",
              "CHEM102A",
            ]
          }
        ]
      }
      \`\`\`

  5. Additional Details:
    - Include clear logical operators (and, or) and group courses appropriately.
    - Handle cases like "any one of" or "at least X units in…" correctly.
  6. Formatting:
    - Ensure every JSON object is syntactically correct.
    - If there is only one requirement at all, wrap it in an "and" condition.

Given these guidelines, your task is to process the provided course and prerequisite text and return a well-formatted JSON object as described. If additional clarification is needed, infer reasonable assumptions. Always output valid JSON.

Some notices:
When you see a course followed by a unit number requirements from the same course level, for example: "Art History 340 and 6 units of courses labelled Art at the 300 level." The 6 units should be in addition to the Art History 340 course. In order to represent this, you can use the "exclude" field to exclude the course that is being repeated:
\`\`\`
{
  "and": [
    "ARHI340",
    {
      "level": "300",
      "units": 6,
      "exclude": [
        "ARHI340"
      ],
      "subject": "ART"
    }
  ]
}
\`\`\`

Here is a full list of subject codes and their corresponding names you may use:
${subjects.map((subject) => `${subject.code}: ${subject.title}`).join("\n")}

Here is a full list of faculties and their corresponding names you may use:
${faculties.map((faculty) => `${faculty.code}: ${faculty.display_name}`).join("\n")}

Here is a full list of departments and their corresponding names you may use:
${departments.map((department) => `${department.code}: ${department.name}`).join("\n")}
`
}

const getUserPrompt = (req: string, department: string, faculty: string) => {
  return `
The requisite text is: ${req}

If the requisite text mentions specifically a department or faculty, use the following information; otherwise, ignore it:
The course-related department is: ${department}
The course-related faculty is: ${faculty}
  `
}
