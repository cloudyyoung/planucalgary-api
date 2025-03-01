import { Schema } from "ajv"

const and: Schema = {
  type: "object",
  description: "Logic operator of a relationship A and B",
  required: ["and"],
  additionalProperties: false,
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
}

const or: Schema = {
  type: "object",
  description: "Logic operator of a relationship A or B",
  required: ["or"],
  additionalProperties: false,
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
}

const not: Schema = {
  type: "object",
  description: "Logic operator of a relationship not A",
  required: ["not"],
  additionalProperties: false,
  properties: {
    not: {
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
}

const units: Schema = {
  type: "object",
  required: ["units"],
  additionalProperties: false,
  properties: {
    units: {
      type: "integer",
    },
    from: {
      anyOf: [{ $ref: "#/definitions/course" }, { type: "null" }],
    },
    exclude: {
      anyOf: [{ $ref: "#/definitions/course" }, { type: "null" }],
    },
    field: {
      oneOf: [{ type: "string" }, { type: "null" }],
    },
    level: {
      oneOf: [{ $ref: "#/definitions/level" }, { type: "null" }],
    },
    subject: {
      oneOf: [{ $ref: "#/definitions/subject" }, { type: "null" }],
    },
  },
}

const consent: Schema = {
  type: "object",
  required: ["consent"],
  additionalProperties: false,
  properties: {
    consent: {
      oneOf: [{ $ref: "#/definitions/faculty" }, { $ref: "#/definitions/department" }],
    },
  },
}

const admission: Schema = {
  type: "object",
  required: ["admission"],
  additionalProperties: false,
  properties: {
    admission: {
      type: "object",
      oneOf: [
        { $ref: "#/definitions/faculty" },
        { $ref: "#/definitions/department" },
        { $ref: "#/definitions/program" },
      ],
    },
  },
}

const faculty: Schema = {
  type: "object",
  required: ["faculty"],
  additionalProperties: false,
  properties: {
    faculty: {
      type: "string",
      pattern: "^[A-Z]{2}$",
    },
  },
}

const department: Schema = {
  type: "object",
  required: ["department"],
  additionalProperties: false,
  properties: {
    department: {
      type: "string",
      pattern: "^[A-Z]{4}$",
    },
  },
}

const program: Schema = {
  type: "object",
  required: ["program"],
  additionalProperties: false,
  properties: {
    program: {
      type: "string",
    },
  },
}

const year: Schema = {
  type: "object",
  required: ["year"],
  additionalProperties: false,
  properties: {
    year: {
      type: "number",
    },
  },
}

// Primitives
const course: Schema = {
  type: "string",
  pattern: "^[A-Z]{3,4}[0-9]{2,3}(-[0-9])?(.[0-9]{2})?[AB]?$",
}

const level: Schema = {
  type: "string",
  pattern: "^[0-9]{2,3}[+]?$",
}

const subject: Schema = {
  type: "string",
  pattern: "^[A-Z]{3,4}$",
}

export const schema: Schema = {
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
    course,
    level,
    subject,

    // Boolean operators
    and,
    or,
    not,
    units,
    consent,
    admission,
    year,

    // Objects
    faculty,
    department,
    program,
  },
}
