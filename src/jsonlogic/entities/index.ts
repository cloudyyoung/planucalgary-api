import { Entity } from "./entity"
import { Course } from "./course"
import { Department } from "./department"
import { Program } from "./program"
import { Faculty } from "./faculty"

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
  throw new Error(`No matching entity found for JSON: ${JSON.stringify(jsonLogic)}`)
}