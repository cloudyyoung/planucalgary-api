import OpenAI from "openai"
import { OPENAI_API_KEY } from "../../config"
import { prismaClient } from "../../middlewares"

export const OpenAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export default OpenAIClient

export const generatePrereq = async (prereq: string) => {
  const response = await OpenAIClient.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: getSystemPrompt(),
      },
      {
        role: "user",
        content: prereq,
      },
    ],
    response_format: getResponseFormat(),
  })

  return response.choices[0].message.content
}

const getResponseFormat = () => {
  const faculties = prismaClient.faculty.findMany().then((faculties) => faculties.map((faculty) => faculty.name))

  const anyOf = [
    { $ref: "#/$defs/and" },
    { $ref: "#/$defs/or" },
    { $ref: "#/$defs/units" },
    { $ref: "#/$defs/consent" },
    { $ref: "#/$defs/admission" },
    { $ref: "#/$defs/program" },
    { type: "string" },
  ]

  return {
    type: "json_schema" as const,
    json_schema: {
      name: "requisite_schema",
      strict: true,
      schema: {
        type: "object",
        required: ["requisite"],
        additionalProperties: false,
        properties: { requisite: { anyOf: anyOf } },
        $defs: {
          and: {
            type: "object",
            description: "A and B",
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
            description: "A or B",
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
          units: {
            type: "object",
            description: "X units",
            required: ["units", "from", "include", "field", "level", "subject"],
            additionalProperties: false,
            properties: {
              units: { type: "number", description: "X units" },
              from: {
                description: "from a list of courses",
                additionalProperties: false,
                anyOf: [{ type: "array", items: { type: "string" } }, { type: "null" }],
              },
              include: {
                description: "include a list of courses",
                additionalProperties: false,
                anyOf: [
                  { $ref: "#/$defs/and" },
                  { $ref: "#/$defs/or" },
                  { $ref: "#/$defs/units" },
                  { type: "array", items: { type: "string" } },
                  { type: "null" },
                ],
              },
              field: {
                description: "field of study",
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              level: {
                description: "course level of study; when suffixed with +, it means at or above the level",
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              subject: {
                description: "subject of study",
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
                anyOf: [
                  { $ref: "#/$defs/faculty" },
                  {
                    type: "object",
                    description: "consent to a department",
                    required: ["department"],
                    additionalProperties: false,
                    properties: {
                      department: {
                        type: "string",
                        description: "name of the department; exclude 'Department of' prefix",
                      },
                    },
                  },
                  { type: "string", description: "consent" },
                ],
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
                anyOf: [
                  { $ref: "#/$defs/faculty" },
                  { $ref: "#/$defs/program" },
                  {
                    type: "object",
                    description: "admission to a department",
                    required: ["department"],
                    additionalProperties: false,
                    properties: {
                      department: {
                        type: "string",
                        description: "department",
                      },
                    },
                  },
                ],
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
                enum: faculties,
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
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              faculty: {
                anyOf: [
                  {
                    type: "string",
                    enum: faculties,
                  },
                  { type: "null" },
                ],
              },
              department: {
                description: "department",
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              honours: {
                description: "honours program",
                anyOf: [{ type: "boolean" }, { type: "null" }],
              },
              type: {
                description: "type of program; eg, major, minor, concentration",
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
                anyOf: [{ type: "string" }, { type: "null" }],
              },
              career: {
                description: "career level; eg, undergraduate, master, doctoral",
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
                anyOf: [{ type: "number" }, { type: "null" }],
              },
            },
          },
        },
      },
    },
  }
}

const getSystemPrompt = () => {
  return `

You are an advanced admission bot for a university tasked with processing course prerequisites for use in a structured database. Your job is to:
  1. Input: Take course information and a textual description of its prerequisites.
  2. Output: Convert the prerequisites into a JSON format with the following structure:
    - Use full subject names for courses (e.g., "Mathematics" instead of "MATH").
    - Avoid deeply nested logical structures for readability.
    - Simplify logical expressions wherever possible without losing meaning.
    - Ensure no requirement has "units" equal to 0, because it does not make sense to have a course with 0 units.
  3. Rules:
    - Represent logical prerequisites clearly in JSON format using keys like "and" or "or".
    - Flatten unnecessary nesting of conditions to make the JSON more concise.
    - Handle exceptions gracefully by assuming ambiguous text needs clarification and simplifying to the most likely structure.
    - Try to use the logical operators you are provided with to represent the prerequisites as accurately as possible.
  4. Examples:
    Input Text: "Mathematics 101, and Physics 201 or Chemistry 102"
    Output JSON:
      \`\`\`json
      {
        "and": [
          "Mathematics 101",
          {
            "or": [
              ""Physics 201",
              ""Chemistry 102"
            ]
          }
        ]
      }
      \`\`\`

  5. Additional Details:
    - If no units are explicitly provided, assume 3 units per course unless otherwise stated.
    - Include clear logical operators (and, or) and group courses appropriately.
    - Handle cases like "any one of" or "at least X units in…" correctly.
  6. Formatting:
    - Ensure every JSON object is syntactically correct.
    - If there is only one requirement at all, wrap it in an "and" condition.

Given these guidelines, your task is to process the provided course and prerequisite text and return a well-formatted JSON object as described. If additional clarification is needed, infer reasonable assumptions. Always output valid JSON.
  `
}
