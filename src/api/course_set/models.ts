import mongoose from 'mongoose';

const { Schema, connection } = mongoose;

interface CatalogCourseSetStructureRuleProps {
  value: string;
}

const CatalogCourseSetStructureRuleSchema = new Schema<CatalogCourseSetStructureRuleProps>({
  value: {
    type: String,
    required: true
  }
})

interface CatalogCourseSetStructureProps {
  condition: string;
  rules: CatalogCourseSetStructureRuleProps[];
}

const CatalogCourseSetStructureSchema = new Schema<CatalogCourseSetStructureProps>({
  condition: {
    type: String,
    required: true
  },
  rules: {
    type: [CatalogCourseSetStructureRuleSchema],
    required: true
  }
})

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
    type: CatalogCourseSetStructureSchema,
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
