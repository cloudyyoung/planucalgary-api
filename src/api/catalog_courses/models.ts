import { Schema, connection } from "mongoose"
import { CatalogCourseDocument } from "../../interfaces/mongoose.gen"

const CatalogCourseSchema = new Schema<CatalogCourseDocument>(
  {
    active: {
      type: Boolean,
      default: true,
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
      type: Object,
    },
    coreq_text: {
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
    units: {
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
      type: Object,
    },
    prereq_text: {
      type: String,
    },
    repeatable: {
      type: Boolean,
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
const CatalogCourse = catalog.model("CatalogCourse", CatalogCourseSchema, "courses")
export { CatalogCourse }
