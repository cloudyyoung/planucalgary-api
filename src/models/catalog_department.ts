import mongoose from "mongoose"
const { Schema, connection } = mongoose

import { CatalogDepartmentDocument, CatalogDepartmentModel, CatalogDepartmentSchema } from "./interfaces.gen"

const schema: CatalogDepartmentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const catalog = connection.useDb("catalog")
const CatalogDepartment = catalog.model<CatalogDepartmentDocument, CatalogDepartmentModel>(
  "CatalogDepartment",
  schema,
  "departments",
)
export { CatalogDepartment }
