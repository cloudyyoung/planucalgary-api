import { Expose, Type } from 'class-transformer';
import { Hydratable } from './interfaces';
import { CourseDocument } from '../../api/courses/types';
import { CatalogCourse } from '../../api/courses/model';

class StructureConditionRule {
  @Expose({ name: "value" })
  id: string = "";

  @Expose()
  value: CourseDocument | {} = {};

  hydrate(courses: { [key: string]: CourseDocument }) {
    this.value = courses[this.id] || {}
  }
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
    const courses_array = await CatalogCourse.find({ course_group_id: { $in: ids } })
    const courses_map = Object.fromEntries(courses_array.map(course => [course.course_group_id, course]))

    for (const rule of this.rules) {
      await rule.hydrate(courses_map)
    }
  }
}

export { StructureCondition }