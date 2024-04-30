import mongoose from 'mongoose';
import { RequisiteSetProps } from './types';
const { Schema, connection } = mongoose;

const CatalogRequisiteSetSchema = new Schema<RequisiteSetProps>({
  description: {
    type: String,
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  requisite_set_group_id: {
    type: String,
    required: true
  },
  requisites: {
    type: Array,
    required: true
  },
  version: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const catalog = connection.useDb('catalog');
const CatalogRequisiteSet = catalog.model('RequisiteSet', CatalogRequisiteSetSchema, 'requisite_sets');
export { CatalogRequisiteSet }
