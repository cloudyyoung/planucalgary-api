import Ajv from "ajv"
import { prismaClient } from "../middlewares"

const COURSE_CODE_REGEX = "^[A-Z]{3,4}[0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?$"

export const schema = {
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
      pattern: COURSE_CODE_REGEX,
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
      pattern: "^[A-Z]{3,4}$",
    },
    faculty: {
      type: "string",
      description: "A faculty code. Eg, 'KN' for Kinesiology.",
      pattern: "^[A-Z]{2}$",
    },
    department: {
      type: "string",
      description: "A department code. Eg, 'CPSC' forDepartment of Computer Science.",
      pattern: "^[A-Z]{3,4}$",
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
      type: "object",
      description: "Logic operator of a relationship A and B",
      required: ["and"],
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
      type: "object",
      description: "Logic operator of a relationship A or B",
      required: ["or"],
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
      type: "object",
      description: "Logic operator of a relationship not A",
      required: ["or"],
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
          type: ["array", "null"],
          description:
            "Specify the courses that the units are from, this is a strict list that the units must be from.",
          items: { $ref: "#/definitions/course" },
        },
        exclude: {
          type: ["array", "null"],
          description:
            "Exclude a list of courses when counting units. This field is usually used when the requisite says some additional units besides the previously named courses",
          items: { $ref: "#/definitions/course" },
        },
        field: {
          type: ["string", "null"],
          description:
            "Field of study. Only include this field is the requisite specifically mentions a field of study. Eg, '6 units of courses in the field of Art.' Only include this field if the requisite specifically mentions a field of study.",
        },
        level: {
          type: ["string", "null"],
          description:
            "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.' Only include this field if the requisite specifically mentions a level.",
          $ref: "#/definitions/level",
        },
        subject: {
          type: ["string", "null"],
          description:
            "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.' Only include this field if the requisite specifically mentions a subject.",
          $ref: "#/definitions/subject",
        },
        faculty: {
          type: ["string", "null"],
          description:
            "Course offered by a faculty. Only include this field if the requisite specifically mentions a faculty.",
          $ref: "#/definitions/faculty",
        },
        department: {
          type: ["string", "null"],
          description:
            "Course offered by a department. Only include this field if the requisite specifically mentions a department.",
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
          anyOf: [{ $ref: "#/definitions/faculty_object" }, { $ref: "#/definitions/department_object" }],
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
          anyOf: [
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

export const ajv = new Ajv({
  strict: "log",
  allowUnionTypes: true,
  allErrors: true,
  // removeAdditional: "all",
})

interface GetHydratedSchemaOptions {
  include_subjects?: boolean
  incliude_faculties?: boolean
  include_departments?: boolean
  include_courses?: boolean
}

export const getHydratedSchema = async ({
  include_subjects = true,
  incliude_faculties = true,
  include_departments = true,
  include_courses = false,
}: GetHydratedSchemaOptions = {}) => {
  const deepcopy = (obj: any) => JSON.parse(JSON.stringify(obj))

  const hydratedSchema: any = deepcopy(schema)

  if (include_subjects) {
    const subjects = await prismaClient.subject.findMany()
    const subjectCodes = subjects.map((subject) => subject.code)
    hydratedSchema.definitions.subject.enum = subjectCodes
    delete hydratedSchema.definitions.subject.pattern
  }

  if (incliude_faculties) {
    const faculties = await prismaClient.faculty.findMany()
    const facultyCodes = faculties.map((faculty) => faculty.code)
    hydratedSchema.definitions.faculty.enum = facultyCodes
    delete hydratedSchema.definitions.faculty.pattern
  }

  if (include_departments) {
    const departments = await prismaClient.department.findMany()
    const departmentCodes = departments.map((department) => department.code)
    hydratedSchema.definitions.department.enum = departmentCodes
    delete hydratedSchema.definitions.department.pattern
  }

  if (include_courses) {
    const courses = await prismaClient.course.findMany({
      select: {
        code: true,
      },
      distinct: ["code"],
    })
    const courseCodes = courses.map((course) => course.code)
    hydratedSchema.definitions.course.enum = courseCodes
    delete hydratedSchema.definitions.course.pattern
  }

  return hydratedSchema
}
