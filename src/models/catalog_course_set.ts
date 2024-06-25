import { Schema, connection } from "mongoose"

import { CatalogCourseSetDocument, CatalogCourseSetModel, CatalogCourseSetSchema } from "./interfaces.gen"

const schema: CatalogCourseSetSchema = new Schema(
  {
    course_list: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    structure: {
      type: Map,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["static", "dynamic"],
    },
  },
  {
    timestamps: true,
  },
)

const catalog = connection.useDb("catalog")
const CatalogCourseSet = catalog.model<CatalogCourseSetDocument, CatalogCourseSetModel>(
  "CatalogCourseSet",
  schema,
  "course_sets",
)
export { CatalogCourseSet }
