import { Expose, Type } from 'class-transformer';

class RequisitesSimpleRuleValueValues {
  logic: "and" | "or" = "and";
  value: string[] = [];
}

class RequisitesSimpleRuleValue {
  id: string = "";
  condition: "courses" | "programs" | "courseSets" | "requirementSets" | "requisiteSets" | "none" = "none";

  @Type(() => RequisitesSimpleRuleValueValues)
  values: RequisitesSimpleRuleValueValues[] = [];

  getCourseSetIds() {
    if (this.condition === "courseSets") {
      return this.values.flatMap(value => value.value)
    }
    return [];
  }

  getRequisiteSetIds() {
    if (this.condition === "requisiteSets") {
      return this.values.flatMap(value => value.value)
    }
    return [];
  }
}

class RequisitesSimpleRule {
  id: string = "";
  name: string = "";
  description: string = "";
  notes: string | null = null;
  condition: "anyOf" | "allOf" | "numberOf" | "completedAllOf" | "completedAtLeastXOf" | "completedAnyOf" | "enrolledIn" | "minimumCredits" | "minimumResidencyCredits" | "minimumGrade" | "averageGrade" | "freeformText" | "completeVariableCoursesAndVariableCredits" = "anyOf";

  @Expose({ name: "minCourses" })
  min_courses: number = 0;

  @Expose({ name: "maxCourses" })
  max_courses: number = 0;

  @Expose({ name: "minCredits" })
  min_credits: number = 0;

  @Expose({ name: "maxCredits" })
  max_credits: number = 0;

  credits: number = 0;
  number: number = 0;
  restriction: string = "";
  grade: string = "";

  @Expose({ name: "gradeType" })
  grade_type: string = "";

  @Type(() => RequisitesSimpleRule)
  @Expose({ name: "subRules" })
  sub_rules: RequisitesSimpleRule[] = []

  @Type(() => RequisitesSimpleRuleValue)
  value: string | RequisitesSimpleRuleValue = "";

  getCourseSetIds() {
    if (this.value instanceof RequisitesSimpleRuleValue) {
      return this.value.getCourseSetIds()
    }
    return [];
  }

  getRequisiteSetIds() {
    if (this.value instanceof RequisitesSimpleRuleValue) {
      return this.value.getRequisiteSetIds()
    }
    return [];
  }
}

class RequisitesSimple {
  id: string = "";
  type: string = "";
  name: string = "";
  notes: string | null = null;

  @Type(() => RequisitesSimpleRule)
  rules: RequisitesSimpleRule[] = [];

  getCourseSetIds() {
    return this.rules.flatMap(rule => rule.getCourseSetIds())
  }

  getRequisiteSetIds() {
    return this.rules.flatMap(rule => rule.getRequisiteSetIds())
  }
}

class Requisites {
  @Type(() => RequisitesSimple)
  @Expose({ name: "requisitesSimple" })
  requisites_simple: RequisitesSimple[] = []

  getCourseSetIds() {
    return this.requisites_simple.flatMap(requisite => requisite.getCourseSetIds())
  }

  getRequisiteSetIds() {
    return this.requisites_simple.flatMap(requisite => requisite.getRequisiteSetIds())
  }
}

export { Requisites }