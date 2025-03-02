export interface GetSchemaOptions {
  subjectCodes: string[]
  facultyCodes: string[]
  departmentCodes: string[]
}

export const getSchema = ({ subjectCodes, facultyCodes, departmentCodes }: GetSchemaOptions) => {
  const string_ = {
    type: "string",
  }

  const null_ = {
    type: "null",
  }

  const course = {
    type: "string",
    description: "Course code",
  }

  const subject = {
    type: "string",
    description:
      "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.'",
    enum: subjectCodes,
  }

  const level = {
    type: "string",
    description:
      "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.'",
  }

  const department = {
    type: "string",
    description: "A department code. Eg, 'CPSC' for Department of Computer Science.",
    enum: departmentCodes,
  }

  const department_obj = {
    type: "object",
    description: "A department",
    required: ["department"],
    additionalProperties: false,
    properties: {
      department: department,
    },
  }

  const faculty = {
    type: "string",
    description: "A faculty code. Eg, 'KN' for Kinesiology.",
    enum: facultyCodes,
  }

  const faculty_obj = {
    type: "object",
    description: "A faculty",
    required: ["faculty"],
    additionalProperties: false,
    properties: {
      faculty: faculty,
    },
  }

  const program_onj = {
    type: "object",
    description: "A program",
    required: ["program"],
    additionalProperties: false,
    properties: {
      program: {
        type: "string",
        description: "A program code",
      },
    },
  }

  const schema = {
    anyOf: [
      { $ref: "#/definitions/and" },
      { $ref: "#/definitions/or" },
      { $ref: "#/definitions/not" },
      { $ref: "#/definitions/units" },
      { $ref: "#/definitions/consent" },
      { $ref: "#/definitions/admission" },
      { $ref: "#/definitions/year" },
    ],

    definitions: {
      and: {
        type: "object",
        description: "Logic operator of a relationship A and B",
        required: ["and"],
        additionalProperties: false,
        properties: {
          and: {
            type: "array",
            items: {
              anyOf: [
                course,
                {
                  $ref: "#/$defs/or",
                },
                {
                  $ref: "#/$defs/not",
                },
                {
                  $ref: "#/$defs/units",
                },
                {
                  $ref: "#/$defs/consent",
                },
                {
                  $ref: "#/$defs/admission",
                },
                {
                  $ref: "#/$defs/year",
                },
              ],
            },
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
            items: {
              anyOf: [
                course,
                {
                  $ref: "#/$defs/and",
                },
                {
                  $ref: "#/$defs/not",
                },
                {
                  $ref: "#/$defs/units",
                },
                {
                  $ref: "#/$defs/consent",
                },
                {
                  $ref: "#/$defs/admission",
                },
                {
                  $ref: "#/$defs/year",
                },
              ],
            },
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
            anyOf: [
              course,
              {
                $ref: "#/$defs/and",
              },
              {
                $ref: "#/$defs/or",
              },
              {
                $ref: "#/$defs/units",
              },
              {
                $ref: "#/$defs/consent",
              },
              {
                $ref: "#/$defs/admission",
              },
              {
                $ref: "#/$defs/year",
              },
            ],
          },
        },
      },
      units: {
        type: "object",
        description: "X units",
        required: ["units", "from", "exclude", "field", "level", "subject", "faculty", "department"],
        additionalProperties: false,
        properties: {
          units: {
            type: "number",
            description: "X units",
          },
          from: {
            description:
              "Specify the courses that the units are from, this is a strict list that the units must be from.",
            anyOf: [{ type: "array", items: course }, null_],
          },
          exclude: {
            description:
              "Exclude a list of courses when counting units. This field is usually used when the requisite says some additional units besides the previously named courses",
            anyOf: [{ type: "array", items: course }, null_],
          },
          field: {
            description:
              "Field of study. Only include this field is the requisite specifically mentions a field of study. Eg, '6 units of courses in the field of Art.' Only include this field if the requisite specifically mentions a field of study.",
            anyOf: [string_, null_],
          },
          level: {
            description:
              "Course level of study. When suffixed with +, it means at or above the level. Eg, '6 units of courses at the 300 level or above.' Only include this field if the requisite specifically mentions a level.",
            anyOf: [level, null_],
          },
          subject: {
            description:
              "Subject of study. Only include this field is the requisite specifically mentions a subject. Eg, '6 units of courses labelled Art.' Only include this field if the requisite specifically mentions a subject.",
            anyOf: [subject, null_],
          },
          faculty: {
            description:
              "Course offered by a faculty. Only include this field if the requisite specifically mentions a faculty.",
            anyOf: [faculty, null_],
          },
          department: {
            description:
              "Course offered by a department. Only include this field if the requisite specifically mentions a department.",
            anyOf: [department, null_],
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
            anyOf: [faculty_obj, department_obj],
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
            anyOf: [faculty_obj, department_obj, program_onj],
          },
        },
      },
      year: {
        type: "object",
        description: "Year of study",
        required: ["year"],
        additionalProperties: false,
        properties: {
          year: {
            type: "string",
            description:
              "year of study, or year standing. eg, first-year, second-year, third-year, fourth-year, fifth-year standing or higher",
            enum: ["first", "second", "third", "fourth", "fifth"],
          },
        },
      },
    },
  }

  return schema
}
