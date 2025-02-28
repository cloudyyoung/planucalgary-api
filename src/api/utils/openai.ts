import OpenAI from "openai"
import { OPENAI_API_KEY } from "../../config"
import { prismaClient } from "../../middlewares"
import { Department, Faculty, Subject } from "@prisma/client"
import { cleanup } from "../../jsonlogic/utils"

export const OpenAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export default OpenAIClient

export async function generatePrereq(req: string, department: string, faculty: string, n: number): Promise<string[]> {
  const subjects = await prismaClient.subject.findMany()
  const faculties = await prismaClient.faculty.findMany()
  const departments = await prismaClient.department.findMany()

  const systemPrompt = getSystemPrompt(subjects, faculties, departments)
  const userPrompt = getUserPrompt(req, department, faculty)
  const responseFormat = getResponseFormat(faculties, departments)

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

const getResponseFormat = (faculties: Faculty[], departments: Department[]) => {
  const facultyCodes = faculties.map((faculty) => faculty.code)
  const departmentCodes = departments.map((department) => department.code)

  const anyOf = [
    { $ref: "#/$defs/and" },
    { $ref: "#/$defs/or" },
    { $ref: "#/$defs/not" },
    { $ref: "#/$defs/course" },
    { $ref: "#/$defs/units" },
    { $ref: "#/$defs/consent" },
    { $ref: "#/$defs/admission" },
    { $ref: "#/$defs/year" },
    // { type: "string" },
  ]

  return {
    type: "json_schema" as const,
    json_schema: {
      name: "requisite_schema",
      description: "Schema for course prerequisites",
      strict: true,
      schema: {
        type: "object",
        required: ["requisite"],
        additionalProperties: false,
        properties: { requisite: { anyOf: anyOf } },
        $defs: {
          and: {
            type: "object",
            description: "Logic operator of a relationship A and B",
            required: ["and"],
            additionalProperties: false,
            properties: {
              and: {
                type: "array",
                description: "and",
                items: { anyOf: anyOf },
                additionalProperties: false,
              },
            },
          },
          or: {
            type: "object",
            description: "Logic operator of a relationship A or B",
            required: ["or"],
            additionalProperties: false,
            properties: {
              or: {
                type: "array",
                description: "or",
                items: { anyOf: anyOf },
                additionalProperties: false,
              },
            },
          },
          not: {
            type: "object",
            description: "Logic operator of a relationship not A",
            required: ["not"],
            additionalProperties: false,
            properties: {
              not: {
                type: "object",
                description: "not",
                anyOf: anyOf,
                additionalProperties: false,
              },
            },
          },
          course: {
            type: "string",
            description:
              "The course code that satified the following regex pattern: ^[A-Z]{4}[0-9]{2,3}(-[0-9])?(.[0-9]{1,2})?[A-B]?$",
          },
          units: {
            type: "object",
            description: "X units",
            required: ["units", "from", "include", "exclude", "field", "level", "subject"],
            additionalProperties: false,
            properties: {
              units: { type: "number", description: "X units", additionalProperties: false },
              from: {
                description:
                  "Specify the courses that the units are from, this is a strict list that the units must be from",
                additionalProperties: false,
                anyOf: [{ type: "array", items: { $ref: "#/$defs/course" } }, { type: "null" }],
              },
              include: {
                description: "To specifically include a list of courses in the units count",
                additionalProperties: false,
                anyOf: [{ type: "array", items: { $ref: "#/$defs/course" } }, { type: "null" }],
              },
              exclude: {
                description:
                  "Exclude a list of courses when counting units. This field is usually used when the requisite says some additional units besides the previously named courses",
                additionalProperties: false,
                anyOf: [{ type: "array", items: { $ref: "#/$defs/course" } }, { type: "null" }],
              },
              field: {
                description:
                  "Field of study. Only include this field is the requisite specifically mentions a field of study. Eg, '6 units of courses in the field of Art.'",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              level: {
                description:
                  "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.'",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              subject: {
                description:
                  "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.'",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
            },
          },
          consent: {
            type: "object",
            description: "consent",
            required: ["consent"],
            additionalProperties: false,
            properties: {
              consent: {
                additionalProperties: false,
                anyOf: [{ $ref: "#/$defs/faculty" }, { $ref: "#/$defs/department" }],
              },
            },
          },
          admission: {
            type: "object",
            description: "admission to a program, a department, or a course",
            required: ["admission"],
            additionalProperties: false,
            properties: {
              admission: {
                additionalProperties: false,
                anyOf: [{ $ref: "#/$defs/faculty" }, { $ref: "#/$defs/program" }, { $ref: "#/$defs/department" }],
              },
            },
          },
          faculty: {
            type: "object",
            description: "a faculty",
            required: ["faculty"],
            additionalProperties: false,
            properties: {
              faculty: {
                type: "string",
                description: "faculty",
                additionalProperties: false,
                enum: facultyCodes,
              },
            },
          },
          department: {
            type: "object",
            description: "a department",
            required: ["department"],
            additionalProperties: false,
            properties: {
              department: {
                type: "string",
                description: "department",
                additionalProperties: false,
                enum: departmentCodes,
              },
            },
          },
          program: {
            type: "object",
            description: "a program",
            required: ["program", "faculty", "department", "honours", "type", "degree", "career", "year", "gpa"],
            additionalProperties: false,
            properties: {
              program: {
                description: "the field name of the program; leave null if no specific program name is specified",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              faculty: {
                description: "The faculty that offers the program",
                additionalProperties: false,
                anyOf: [
                  {
                    type: "string",
                    enum: facultyCodes,
                  },
                  { type: "null" },
                ],
              },
              department: {
                description: "The department that offers the program",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              honours: {
                description: "Whether the program has to be an honours program",
                additionalProperties: false,
                anyOf: [{ type: "boolean" }, { type: "null" }],
              },
              type: {
                description: "type of program; eg, major, minor, concentration",
                additionalProperties: false,
                anyOf: [
                  {
                    type: "string",
                    enum: ["major", "minor", "concentration"],
                  },
                  { type: "null" },
                ],
              },
              degree: {
                description: "degree name; eg, BSc, BA, BEng, etc",
                additionalProperties: false,
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              career: {
                description: "career level; eg, undergraduate, master, doctoral",
                additionalProperties: false,
                anyOf: [
                  {
                    type: "string",
                    enum: ["undergraduate", "master", "doctoral"],
                  },
                  { type: "null" },
                ],
              },
              year: {
                description: "academic standing",
                additionalProperties: false,
                anyOf: [
                  {
                    type: "string",
                    enum: ["first", "second", "third", "fourth", "fifth"],
                  },
                  { type: "null" },
                ],
              },
              gpa: {
                description: "minimum GPA",
                additionalProperties: false,
                anyOf: [{ type: "number" }, { type: "null" }],
              },
            },
          },
          year: {
            type: "object",
            description:
              "year of study, or year standing. eg, first-year, second-year, third-year, fourth-year, fifth-year standing or higher",
            additionalProperties: false,
            anyOf: [
              {
                type: "string",
                enum: ["first", "second", "third", "fourth", "fifth"],
              },
            ],
          },
        },
      },
    },
  }
}

const getSystemPrompt = (subjects: Subject[], faculties: Faculty[], departments: Department[]) => {
  return `
You are an advanced admission bot for a university tasked with processing course prerequisites for use in a structured database. Your job is to:
  1. Input: Take course information and a textual description of its prerequisites.
  2. Output: Convert the prerequisites into a JSON format with the following structure:
    - Use subject code names for courses (e.g., "MATH" instead of "Mathematics" whenever you can. But if there is no corresponding subject code, do not make up one, instead, reserve the original course name as it is).
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
    Input Text: "Mathematics 101, and Physics 201 or Chemistry 102A"
    Output JSON:
      \`\`\`json
      {
        "and": [
          "MATH101",
          {
            "or": [
              ""PHYS201",
              ""CHEM102A"
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

Here is a full list of subject codes and their corresponding names:
${subjects.map((subject) => `${subject.code}: ${subject.title}`).join("\n")}

Here is a full list of faculties and their corresponding names:
${faculties.map((faculty) => `${faculty.code}: ${faculty.display_name}`).join("\n")}

Here is a full list of departments and their corresponding names:
${departments.map((department) => `${department.code}: ${department.name}`).join("\n")}
  `
}

const getUserPrompt = (req: string, department: string, faculty: string) => {
  return `
The requisite text is: ${req}
The department is: ${department}
The faculty is: ${faculty}
  `
}
