import { Type } from 'class-transformer';

class StructureConditionRule {
  value?: string = "";
}

class StructureCondition {
  condition: "all" | "any" = "any";

  @Type(() => StructureConditionRule)
  rules: StructureConditionRule[] = [];

  getCourseSetIds(): string[] {
    return this.rules.flatMap(rule => rule.value).filter(value => value !== undefined) as string[];
  }
}

export { StructureCondition }