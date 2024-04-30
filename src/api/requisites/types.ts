
interface RequisitesSimpleRuleValueValuesProps {
  logic: "and" | "or";
  value: string[];
}


interface RequisitesSimpleRuleValueProps {
  id: string;
  condition: "courses" | "programs" | "courseSets" | "requirementSets" | "requisiteSets" | "none";
  values: RequisitesSimpleRuleValueValuesProps[];
}

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

interface RequisitesSimpleProps {
  id: string;
  type: string;
  name: string;
  notes: string;
  rules: RequisitesSimpleRuleProps[];
}

interface RequisitesProps {
  requisitesSimple: RequisitesSimpleProps
}

export type {
  RequisitesProps,
  RequisitesSimpleProps,
  RequisitesSimpleRuleProps,
  RequisitesSimpleRuleValueProps,
  RequisitesSimpleRuleValueValuesProps
}