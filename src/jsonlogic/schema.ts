import Ajv from "ajv"
import { prismaClient } from "../middlewares"

export const getSchema = async () => {
  const subjects = await prismaClient.subject.findMany()
  const faculties = await prismaClient.faculty.findMany()
  const departments = await prismaClient.department.findMany()

  const subjectCodes = subjects.map((subject) => subject.code)
  const facultyCodes = faculties.map((faculty) => faculty.code)
  const departmentCodes = departments.map((department) => department.code)

  return {
    anyOf: [
      // Primitives
      // Course is the only primitive that can be at the root level, returns True if the course exists in data
      { $ref: "#/definitions/course" },

      // Boolean operators
      { $ref: "#/definitions/and" },
      { $ref: "#/definitions/or" },
      { $ref: "#/definitions/not" },
      { $ref: "#/definitions/units" },
      { $ref: "#/definitions/consent" },
      { $ref: "#/definitions/admission" },
      { $ref: "#/definitions/year" },
    ],

    definitions: {
      // Primitives
      course: {
        type: "string",
        description: "Course code",
        pattern: "^[A-Z]{3,4}[0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?$",
      },
      level: {
        type: "string",
        description:
          "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.'",
        pattern: "^[0-9]{2,3}[+]?$",
      },
      subject: {
        type: "string",
        description:
          "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.'",
        enum: subjectCodes,
      },
      faculty: {
        type: "string",
        description: "A faculty code. Eg, 'KN' for Kinesiology.",
        enum: facultyCodes,
      },
      department: {
        type: "string",
        description: "A department code. Eg, 'CPSC' forDepartment of Computer Science.",
        enum: departmentCodes,
      },
      program: {
        type: "string",
      },
      year_str: {
        type: "string",
        description:
          "year of study, or year standing. eg, first-year, second-year, third-year, fourth-year, fifth-year standing or higher",
        enum: ["first", "second", "third", "fourth", "fifth"],
      },

      // Boolean operators
      and: {
        description: "Logic operator of a relationship A and B",
        properties: {
          and: {
            type: "array",
            items: {
              anyOf: [
                { $ref: "#/definitions/course" },
                { $ref: "#/definitions/or" },
                { $ref: "#/definitions/not" },
                { $ref: "#/definitions/units" },
                { $ref: "#/definitions/consent" },
                { $ref: "#/definitions/admission" },
                { $ref: "#/definitions/year" },
              ],
            },
          },
        },
      },
      or: {
        description: "Logic operator of a relationship A or B",
        properties: {
          or: {
            type: "array",
            items: {
              anyOf: [
                { $ref: "#/definitions/course" },
                { $ref: "#/definitions/and" },
                { $ref: "#/definitions/not" },
                { $ref: "#/definitions/units" },
                { $ref: "#/definitions/consent" },
                { $ref: "#/definitions/admission" },
                { $ref: "#/definitions/year" },
              ],
            },
          },
        },
      },
      not: {
        description: "Logic operator of a relationship not A",
        properties: {
          not: {
            anyOf: [
              { $ref: "#/definitions/course" },
              { $ref: "#/definitions/and" },
              { $ref: "#/definitions/or" },
              { $ref: "#/definitions/units" },
              { $ref: "#/definitions/consent" },
              { $ref: "#/definitions/admission" },
              { $ref: "#/definitions/year" },
            ],
          },
        },
      },
      units: {
        type: "object",
        description: "X units",
        required: ["units"],
        properties: {
          units: {
            type: "integer",
            description: "X units",
          },
          from: {
            type: "array",
            description:
              "Specify the courses that the units are from, this is a strict list that the units must be from.",
            nullable: true,
            items: { $ref: "#/definitions/course" },
          },
          exclude: {
            type: "array",
            description:
              "Exclude a list of courses when counting units. This field is usually used when the requisite says some additional units besides the previously named courses",
            nullable: true,
            items: { $ref: "#/definitions/course" },
          },
          field: {
            type: "string",
            description:
              "Field of study. Only include this field is the requisite specifically mentions a field of study. Eg, '6 units of courses in the field of Art.' Only include this field if the requisite specifically mentions a field of study.",
            nullable: true,
          },
          level: {
            type: "object",
            description:
              "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.' Only include this field if the requisite specifically mentions a level.",
            nullable: true,
            $ref: "#/definitions/level",
          },
          subject: {
            type: "object",
            description:
              "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.' Only include this field if the requisite specifically mentions a subject.",
            nullable: true,
            $ref: "#/definitions/subject",
          },
          faculty: {
            type: "object",
            description:
              "Course offered by a faculty. Only include this field if the requisite specifically mentions a faculty.",
            nullable: true,
            $ref: "#/definitions/faculty",
          },
          department: {
            type: "object",
            description:
              "Course offered by a department. Only include this field if the requisite specifically mentions a department.",
            nullable: true,
            $ref: "#/definitions/department",
          },
        },
      },
      consent: {
        type: "object",
        description: "Consent from a faculty or department",
        required: ["consent"],
        additionalProperties: false,
        properties: {
          consent: {
            oneOf: [{ $ref: "#/definitions/faculty_object" }, { $ref: "#/definitions/department_object" }],
          },
        },
      },
      admission: {
        type: "object",
        description: "Admission to a faculty, department, or program",
        required: ["admission"],
        additionalProperties: false,
        properties: {
          admission: {
            oneOf: [
              { $ref: "#/definitions/faculty_object" },
              { $ref: "#/definitions/department_object" },
              { $ref: "#/definitions/program_object" },
            ],
          },
        },
      },
      year: {
        type: "object",
        description: "Year of study",
        required: ["year"],
        additionalProperties: false,
        properties: {
          year: { $ref: "#/definitions/year_str" },
        },
      },

      // Objects
      faculty_object: {
        type: "object",
        description: "A faculty",
        required: ["faculty"],
        additionalProperties: false,
        properties: {
          faculty: { $ref: "#/definitions/faculty" },
        },
      },
      department_object: {
        type: "object",
        description: "A department",
        required: ["department"],
        additionalProperties: false,
        properties: {
          department: { $ref: "#/definitions/department" },
        },
      },
      program_object: {
        type: "object",
        description: "A program",
        required: ["program"],
        additionalProperties: false,
        properties: {
          program: { $ref: "#/definitions/program" },
        },
      },
    },
  }
}

export const ajv = new Ajv()
export const validate = async (schema: any) => {
  const original_schema = await getSchema()

  const validate = ajv.compile(original_schema)
  return validate(schema)
}
