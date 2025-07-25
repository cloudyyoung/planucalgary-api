import { Entity } from "./entities/entity"
import { Course } from "./entities/course"
import { Department } from "./entities/department"
import { Program } from "./entities/program"
import { Faculty } from "./entities/faculty"

export const fromJsonLogic = (jsonLogic: object | string): Entity<object | string> => {
  const subclasses: (typeof Entity<object | string>)[] = [
    Course,
    Department,
    Program,
    Faculty,
  ]

  for (const entityClass of subclasses) {
    if (entityClass.isEntity(jsonLogic)) {
      return entityClass.fromJsonLogic(jsonLogic)
    }
  }
  throw new Error(`Invalid JSON: ${JSON.stringify(jsonLogic)}`)
}