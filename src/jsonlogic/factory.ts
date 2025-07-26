import { Entity } from "./entities/entity"
import { Course } from "./entities/course"
import { Department } from "./entities/department"
import { Program } from "./entities/program"
import { Faculty } from "./entities/faculty"
import { Operator } from "./operators/operator"

export type OperatorAndEntity<T> = Operator<T> | Entity<T>

export const fromJsonLogic = (jsonLogic: object | string): OperatorAndEntity<object | string> => {
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