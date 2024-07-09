import { Schema, connection } from "mongoose"

import { CatalogCourseDocument, CatalogCourseModel, CatalogCourseSchema } from "./interfaces.gen"

const schema: CatalogCourseSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    aka: {
      type: String,
    },
    antireq: {
      type: Object,
    },
    antireq_text: {
      type: String,
    },
    career: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    components: {
      type: [String],
      required: true,
    },
    coreq: {
      type: Object,
    },
    coreq_text: {
      type: String,
    },
    course_group_id: {
      type: String,
      required: true,
    },
    course_number: {
      type: String,
      required: true,
    },
    coursedog_id: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    departments: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
    },
    faculty_code: {
      type: String,
      required: true,
    },
    faculty_name: {
      type: String,
      required: true,
    },
    grade_mode_code: {
      type: String,
      required: true,
    },
    grade_mode_name: {
      type: String,
      required: true,
    },
    long_name: {
      type: String,
      required: true,
    },
    multi_term: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nogpa: {
      type: Boolean,
      required: true,
    },
    notes: {
      type: String,
    },
    prereq: {
      type: Object,
    },
    prereq_text: {
      type: String,
    },
    repeatable: {
      type: Boolean,
    },
    start_term: {
      type: String,
      required: true,
    },
    subject_code: {
      type: String,
      required: true,
    },
    topics: {
      type: [Map],
    },
    version: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

const catalog = connection.useDb("catalog")
const CatalogCourse = catalog.model<CatalogCourseDocument, CatalogCourseModel>("CatalogCourse", schema, "courses")
export { CatalogCourse }
