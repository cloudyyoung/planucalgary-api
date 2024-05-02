import mongoose from "mongoose"
const { Schema, connection } = mongoose

const CatalogDepartmentSchema = new Schema(
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
const CatalogDepartment = catalog.model("Department", CatalogDepartmentSchema)
export { CatalogDepartment }
