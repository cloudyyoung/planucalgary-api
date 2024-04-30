import { RequisitesProps } from '../requisites/models';


// Get the referenced course sets and requisite sets from the requisites object
export const getReferencedSets = (requisites: RequisitesProps) => {
  const courseSets = [];
  const requisiteSets = [];

  const requisitesSimple = requisites.requisitesSimple;
  for (const requisite of requisitesSimple) {
    for (const rule of requisite.rules) {

      const rule_value = rule.value
      if (typeof rule_value === "string") continue

      const rule_value_condition = rule_value.condition
      const valid_conditions = ["courseSets", "requisiteSets"]
      if (!valid_conditions.includes(rule_value_condition)) continue

      const rule_value_values = rule_value.values
      const set = rule_value_values.flatMap((rule_value_value) => {
        return rule_value_value.value
      })

      if (rule_value_condition === "courseSets") {
        courseSets.push(...set)
      } else if (rule_value_condition === "requisiteSets") {
        requisiteSets.push(...set)
      }
    }
  }

  return {
    referencedCourseSets: courseSets,
    referencedRequisiteSets: requisiteSets
  }
}
