import { Schema, connection } from "mongoose"

import { CatalogRequisiteSetDocument, CatalogRequisiteSetModel, CatalogRequisiteSetSchema } from "./interfaces.gen"

const schema: CatalogRequisiteSetSchema = new Schema(
  {
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
    requisite_set_group_id: {
      type: String,
      required: true,
    },
    requisites: {
      type: [Object],
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const catalog = connection.useDb("catalog")
const CatalogRequisiteSet = catalog.model<CatalogRequisiteSetDocument, CatalogRequisiteSetModel>(
  "CatalogRequisiteSet",
  schema,
  "requisite_sets",
)
export { CatalogRequisiteSet }
