import Ajv from "ajv"

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
      pattern: "^[A-Z]{3,4}[0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?$",
    },
    level: {
      type: "string",
      pattern: "^[0-9]{2,3}[+]?$",
    },
    subject: {
      type: "string",
      pattern: "^[A-Z]{3,4}$",
    },
    faculty: {
      type: "string",
      pattern: "^[A-Z]{2}$",
    },
    department: {
      type: "string",
      pattern: "^[A-Z]{3,4}$",
    },
    program: {
      type: "string",
    },
    year_str: {
      type: "string",
      enum: ["first", "second", "third", "fourth", "fifth"],
    },

    // Boolean operators
    and: {
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
      required: ["units"],
      additionalProperties: false,
      properties: {
        units: {
          type: "integer",
        },
        from: {
          type: "array",
          nullable: true,
          items: { $ref: "#/definitions/course" },
        },
        exclude: {
          type: "array",
          nullable: true,
          items: { $ref: "#/definitions/course" },
        },
        field: {
          type: "string",
          nullable: true,
        },
        level: {
          type: "object",
          nullable: true,
          $ref: "#/definitions/level",
        },
        subject: {
          type: "object",
          nullable: true,
          $ref: "#/definitions/subject",
        },
        faculty: {
          type: "object",
          nullable: true,
          $ref: "#/definitions/faculty",
        },
        department: {
          type: "object",
          nullable: true,
          $ref: "#/definitions/department",
        },
      },
    },
    consent: {
      type: "object",
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
      required: ["year"],
      additionalProperties: false,
      properties: {
        year: { $ref: "#/definitions/year_str" },
      },
    },

    // Objects
    faculty_object: {
      type: "object",
      required: ["faculty"],
      additionalProperties: false,
      properties: {
        faculty: { $ref: "#/definitions/faculty" },
      },
    },
    department_object: {
      type: "object",
      required: ["department"],
      additionalProperties: false,
      properties: {
        department: { $ref: "#/definitions/department" },
      },
    },
    program_object: {
      type: "object",
      required: ["program"],
      additionalProperties: false,
      properties: {
        program: { $ref: "#/definitions/program" },
      },
    },
  },
}

const ajv = new Ajv()
export const validate = ajv.compile(schema)
