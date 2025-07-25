import { Entity } from "./entity"
import { Course } from "./course"
import { Department } from "./department"
import { Program } from "./program"
import { Faculty } from "./faculty"

export type YearString = "first" | "second" | "third" | "fourth" | "fifth"
export type SubjectCode = string
export type FieldString = string
export type LevelString = string


export const fromJsonLogic = (json: object | string): Entity => {
  const subclasses: (typeof Entity)[] = [
    Course,
    Department,
    Program,
    Faculty,
  ]

  for (const entityClass of subclasses) {
    if (entityClass.isEntity(json)) {
      return entityClass.fromJsonLogic(json)
    }
  }
  throw new Error(`No matching entity found for JSON: ${JSON.stringify(json)}`)
}