import { Expose, Type } from 'class-transformer';
import { CatalogCourseSet } from '../../api/catalog_course_sets/models';
import { CatalogRequisiteSet } from '../../api/catalog_requisite_sets/model';
import { CatalogCourse } from '../../api/catalog_courses/model';
import { CatalogProgramModel } from '../../api/catalog_programs/models';
import { CatalogSetsProps } from '../types';
import { convertCourseSetEnginedDocument, convertRequisiteSetEnginedDocument } from '../utils';
import { Hydratable } from './interfaces';

class RequisitesSimpleRuleValueValues {
  logic: "and" | "or" = "and";

  @Expose({ name: "value" })
  ids: string[] = []; // Dehydrated IDs

  @Expose()
  values: CatalogSetsProps[] = []; // Hydrated objects

  hydrate(sets: { [key: string]: CatalogSetsProps }) {
    this.values = this.ids.map(id => sets[id]).filter(Boolean) as CatalogSetsProps[]
  }
}

class RequisitesSimpleRuleValue implements Hydratable {
  id: string = "";
  condition: "courses" | "programs" | "courseSets" | "requirementSets" | "requisiteSets" | "none" = "none";

  @Type(() => RequisitesSimpleRuleValueValues)
  values: RequisitesSimpleRuleValueValues[] = [];

  getIds() {
    return this.values.flatMap(value => value.ids)
  }

  async hydrate() {
    const ids = this.getIds()

    let sets_map = {}

    if (this.condition === "courseSets") {
      // Query for all referenced course sets, and establish engines
      const sets_array = await CatalogCourseSet.find({ id: { $in: ids } })
      const sets_engined_array = sets_array.map(set => convertCourseSetEnginedDocument(set.toJSON()))

      // Hydrate all course sets
      for (const set of sets_engined_array) {
        await set.structure.hydrate()
      }

      // Convert into a map for easy lookup
      sets_map = Object.fromEntries(sets_engined_array.map(set => [set.id, set]))

    } else if (this.condition === "requisiteSets") {
      // Query for all referenced requisite sets, and establish engines
      const sets_array = await CatalogRequisiteSet.find({ requisite_set_group_id: { $in: ids } })
      const sets_engined_array = sets_array.map(set => convertRequisiteSetEnginedDocument(set.toJSON()))

      // Hydrate all requisite sets
      for (const set of sets_engined_array) {
        await set.requisites.hydrate()
      }

      // Convert into a map for easy lookup
      sets_map = Object.fromEntries(sets_engined_array.map(set => [set.requisite_set_group_id, set]))


    } else if (this.condition === "courses") {
      // Query for all referenced courses
      const courses_array = await CatalogCourse.find({ course_group_id: { $in: ids } })

      // Convert into a map for easy lookup
      sets_map = Object.fromEntries(courses_array.map(set => [set.course_group_id, set]))


    } else if (this.condition === "programs") {
      // Query for all referenced programs
      const programs_array = await CatalogProgramModel.find({ program_group_id: { $in: ids } })

      // Convert into a map for easy lookup
      sets_map = Object.fromEntries(programs_array.map(set => [set.program_group_id, set]))
    }

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

class RequisitesSimple implements Hydratable {
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

export { RequisitesSimple }