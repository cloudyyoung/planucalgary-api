import mongoose from 'mongoose';

const { Schema, connection } = mongoose;

interface CatalogCourseSetProps {
  course_list: string[];
  description: string | null;
  id: string;
  name: string;
  structure: object;
  type: "static" | "dynamic";
}

const CatalogCourseSetSchema = new Schema<CatalogCourseSetProps>({
  course_list: {
    type: [String],
    required: true
  },
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
  structure: {
    type: Map,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["static", "dynamic"]
  }
}, {
  timestamps: true
});

const catalog = connection.useDb('catalog');
const CatalogCourseSet = catalog.model('CourseSet', CatalogCourseSetSchema, 'course_sets');
export { CatalogCourseSet }
