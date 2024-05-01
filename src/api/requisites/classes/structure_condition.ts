import { Type } from 'class-transformer';
import { Hydratable } from './interfaces';

class StructureConditionRule {
  value?: string = "";
}

class StructureCondition implements Hydratable {
  condition: "all" | "any" = "any";

  @Type(() => StructureConditionRule)
  rules: StructureConditionRule[] = [];

  async hydrate() {
    
  }
}

export { StructureCondition }