import mongoose from "mongoose"
const { Schema, connection } = mongoose

const CatalogCourseSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    aka: {
      type: String,
    },
    antireq: {
      type: String,
    },
    career: {
      type: String,
    },
    cid: {
      type: String,
    },
    code: {
      type: String,
    },
    components: {
      type: [String],
    },
    coreq: {
      type: String,
    },
    course_group_id: {
      type: String,
    },
    course_number: {
      type: String,
    },
    coursedog_id: {
      type: String,
    },
    credits: {
      type: Number,
    },
    departments: {
      type: [String],
    },
    description: {
      type: String,
    },
    faculty_code: {
      type: String,
    },
    faculty_name: {
      type: String,
    },
    grade_mode_code: {
      type: String,
    },
    grade_mode_name: {
      type: String,
    },
    long_name: {
      type: String,
    },
    multi_term: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    nogpa: {
      type: Boolean,
    },
    notes: {
      type: String,
    },
    prereq: {
      type: String,
    },
    repeatable: {
      type: Boolean,
    },
    requisites: {
      type: Map,
    },
    start_term: {
      type: Map,
    },
    subject_code: {
      type: String,
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
const CatalogCourse = catalog.model("Course", CatalogCourseSchema, "courses")
export { CatalogCourse }
