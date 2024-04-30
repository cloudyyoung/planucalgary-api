import mongoose from 'mongoose';
const { Schema } = mongoose;

interface RequisitesSimpleRuleValueValuesProps {
  logic: "and" | "or";
  value: string[];
}

const RequisitesSimpleRuleValueValuesSchema = new Schema<RequisitesSimpleRuleValueValuesProps>({
  logic: {
    type: String,
    enum: ["and", "or"],
  },
  value: {
    type: [String],
  }
}, { _id: false })

interface RequisitesSimpleRuleValueProps {
  id: string;
  condition: "courses" | "programs" | "courseSets" | "requirementSets" | "requisiteSets" | "none";
  values: RequisitesSimpleRuleValueValuesProps[];
}

const RequisitesSimpleRuleValueSchema = new Schema<RequisitesSimpleRuleValueProps>({
  id: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: [
      "courses",
      "programs",
      "courseSets",
      "requirementSets",
      "requisiteSets", // UCalgary customized
      "none",
    ]
  },
  values: {
    type: [RequisitesSimpleRuleValueValuesSchema]
  }
}, { _id: false })

interface RequisitesSimpleRuleProps {
  id: string;
  name: string;
  description: string;
  notes: string;
  condition: "anyOf" | "allOf" | "numberOf" | "completedAllOf" | "completedAtLeastXOf" | "completedAnyOf" | "enrolledIn" | "minimumCredits" | "minimumResidencyCredits" | "minimumGrade" | "averageGrade" | "freeformText" | "completeVariableCoursesAndVariableCredits";
  minCourses: number;
  maxCourses: number;
  minCredits: number;
  maxCredits: number;
  credits: number;
  number: number;
  restriction: string;
  grade: string;
  gradeType: string;
  subRules: RequisitesSimpleRuleProps[];
  value: string | RequisitesSimpleRuleValueProps;
}

const RequisitesSimpleRuleSchema = new Schema<RequisitesSimpleRuleProps>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  notes: {
    type: String
  },
  condition: {
    type: String,
    enum: [
      "anyOf", // Dependecy field: subRules
      "allOf", // Dependecy field: subRules
      "numberOf", // Dependecy fields: subRules, number
      "completedAllOf", // Dependency field: value
      "completedAtLeastXOf", // Dependency fields: value, restriction
      "completedAnyOf", // Dependency field: value
      "enrolledIn", // Dependency field: value
      "minimumCredits", // Dependency fields: value , credits
      "minimumResidencyCredits", // Dependency fields: value , credits
      "minimumGrade", // Dependency fields: grade, gradeType
      "averageGrade", // Dependency fields: grade, gradeType
      "freeformText", // Dependency field: value
      "completeVariableCoursesAndVariableCredits", // Dependency fields: minCourses, maxCourses, minCredits, maxCredits
    ]
  },
  minCourses: {
    type: Number
  },
  maxCourses: {
    type: Number
  },
  minCredits: {
    type: Number
  },
  maxCredits: {
    type: Number
  },
  credits: {
    type: Number
  },
  number: {
    type: Number
  },
  restriction: {
    type: String
  },
  grade: {
    type: String
  },
  gradeType: {
    type: String
  },
  subRules: {
    type: [],
  },
  value: {
    type: Schema.Types.Mixed, // A string or an object
    validate: {
      validator: function (v: any) {
        // Check if the value is a string
        if (typeof v === 'string') return true;

        // If it's not a string, it should be an object that matches the detailsSchema
        const model = mongoose.model('anonymous', RequisitesSimpleRuleValueSchema);
        const instance = new model(v);
        const error = instance.validateSync();
        return !error; // Valid if no error
      },
      message: () => 'value must be either a string or an object with a key and value'
    }
  },
}, { _id: false })

interface RequisitesSimpleProps {
  id: string;
  type: string;
  name: string;
  notes: string;
  rules: RequisitesSimpleRuleProps[];
}

const RequisitesSimpleSchema = new Schema<RequisitesSimpleProps>({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  notes: {
    type: String
  },
  rules: {
    type: [RequisitesSimpleRuleSchema]
  }
}, { _id: false })

interface RequisitesProps {
  requisitesSimple: RequisitesSimpleProps
}

const RequisitesSchema = new Schema({
  requisitesSimple: {
    type: [RequisitesSimpleSchema], // So far, only requisitesSimple is used
    required: true
  }
}, { _id: false })

export { RequisitesSchema }
export type {
  RequisitesProps,
  RequisitesSimpleProps,
  RequisitesSimpleRuleProps,
  RequisitesSimpleRuleValueProps,
  RequisitesSimpleRuleValueValuesProps
}