import { Expose, Type } from 'class-transformer';
import { Hydratable } from './interfaces';
import { CourseDocument } from '../../courses/types';

class StructureConditionRule {
  @Expose({ name: "value" })
  id: string = "";

  value: CourseDocument | {} = {};
}

class StructureCondition implements Hydratable {
  condition: "all" | "any" = "any";

  @Type(() => StructureConditionRule)
  rules: StructureConditionRule[] = [];

  getIds() {
    return this.rules.map(rule => rule.id)
  }

  async hydrate() {
    const ids = await this.getIds()

    for (const rule of this.rules) {
      // await rule.hydrate()
    }
  }
}

export { StructureCondition }