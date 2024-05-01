import { Expose, Type } from 'class-transformer';
import { CatalogSetsProps } from '../types';
import { Hydratable } from './interfaces';
import { CatalogCourseSet } from '../../course_set/models';
import { CatalogRequisiteSet } from '../../requisite_set/model';

class RequisitesSimpleRuleValueValues {
  logic: "and" | "or" = "and";

  @Expose({ name: "value" })
  raw_value: string[] = []; // Dehydrated IDs

  @Expose()
  value: CatalogSetsProps[] = []; // Hydrated objects

  hydrate(sets: { [key: string]: CatalogSetsProps }) {
    this.value = this.raw_value.map(id => sets[id]).filter(Boolean) as CatalogSetsProps[]
  }
}

class RequisitesSimpleRuleValue implements Hydratable {
  id: string = "";
  condition: "courses" | "programs" | "courseSets" | "requirementSets" | "requisiteSets" | "none" = "none";

  @Type(() => RequisitesSimpleRuleValueValues)
  values: RequisitesSimpleRuleValueValues[] = [];

  getIds() {
    return this.values.flatMap(value => value.raw_value)
  }

  async hydrate() {
    const ids = await this.getIds()

    let sets_array: CatalogSetsProps[] = []
    if (this.condition === "courseSets") {
      sets_array = await CatalogCourseSet.find({ id: { $in: ids } })
    } else if (this.condition === "requisiteSets") {
      sets_array = await CatalogRequisiteSet.find({ requisite_set_group_id: { $in: ids } })
    }

    const sets_map = Object.fromEntries(sets_array.map(set => [set.id, set]))
    for (const value of this.values) {
      await value.hydrate(sets_map)
    }
  }
}

class RequisitesSimpleRule implements Hydratable {
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

  async hydrate() {
    if (this.value instanceof RequisitesSimpleRuleValue) {
      await this.value.hydrate()
    }

    if (this.sub_rules) {
      for (const rule of this.sub_rules) {
        await rule.hydrate()
      }
    }
  }
}

class RequisiteSimpleMember implements Hydratable {
  id: string = "";
  type: string = "";
  name: string = "";
  notes: string | null = null;

  @Type(() => RequisitesSimpleRule)
  rules: RequisitesSimpleRule[] = [];

  async hydrate() {
    for (const rule of this.rules) {
      await rule.hydrate()
    }
  }
}

class RequisitesSimple extends Array<RequisiteSimpleMember> implements Hydratable {
  async hydrate() {
    for (const member of this) {
      await member.hydrate()
    }
  }
}

class Requisites implements Hydratable {
  @Type(() => RequisiteSimpleMember)
  @Expose({ name: "requisitesSimple" })
  requisites_simple: RequisitesSimple = new RequisitesSimple()

  async hydrate() {
    for (const member of this.requisites_simple) {
      await member.hydrate()
    }
  }
}

export { Requisites, RequisitesSimple }
