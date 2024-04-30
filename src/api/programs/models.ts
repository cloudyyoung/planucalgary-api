import mongoose from 'mongoose';
import { RequisitesSchema } from '../requisites/models';
import { RequisitesProps } from '../requisites/types';

const { Schema, connection } = mongoose;

interface CatalogProgramProps {
  active: boolean;
  admission_info: string;
  career: string;
  code: string;
  coursedog_id: string;
  degree_designation_code: string;
  degree_designation_name: string;
  departments: string[];
  display_name: string;
  general_info: string;
  long_name: string;
  name: string;
  program_group_id: string;
  requisites: RequisitesProps;
  start_term: Map<string, any>;
  transcript_description: string;
  transcript_level: string;
  type: string;
  version: number;
}

const CatalogProgramSchema = new Schema<CatalogProgramProps>({
  active: {
    type: Boolean,
    default: true
  },
  admission_info: {
    type: String,
    required: true
  },
  career: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  coursedog_id: {
    type: String,
    required: true
  },
  degree_designation_code: {
    type: String,
    required: true
  },
  degree_designation_name: {
    type: String,
    required: true
  },
  departments: {
    type: [String],
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  general_info: {
    type: String,
    required: true
  },
  long_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  program_group_id: {
    type: String,
    required: true
  },
  requisites: {
    type: RequisitesSchema,
    required: true
  },
  start_term: {
    type: Map,
    required: true
  },
  transcript_description: {
    type: String,
    required: true
  },
  transcript_level: {
    type: String,
    required: true
  },
  type: {
    type: String,
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
const CatalogProgram = catalog.model('Program', CatalogProgramSchema)
export { CatalogProgram }
