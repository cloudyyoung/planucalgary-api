import { RequisitesProps } from '../requisites/models';


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

export const aggregateRequisiteSets = (requisites: RequisitesProps, courseSetsMap: { [key: string]: any }) => {
  const requisitesSimple = requisites.requisitesSimple
  for (const requisite of requisitesSimple) {
    for (const rule of requisite.rules) {
      const rule_value = rule.value
      if (typeof rule_value === "string") continue

      const rule_value_condition = rule_value.condition
      const valid_conditions = ["courseSets", "requisiteSets"]
      if (!valid_conditions.includes(rule_value_condition)) continue

      const rule_value_values = rule_value.values

      for (const rule_value_value of rule_value_values) {
        const value = rule_value_value.value

        for (const [t, v] of value.entries()) {
          if (rule_value_condition === "courseSets") {
            const courseSet = courseSetsMap[v]
            if (!courseSet) continue
            value[t] = courseSet
          }
        }
      }

    }
  }

  return requisites
}
