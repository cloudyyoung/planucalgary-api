export type YearString = "first" | "second" | "third" | "fourth" | "fifth"
export type SubjectCode = string
export type FieldString = string
export type LevelString = string

export abstract class Entity { 
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): object | string;

  // Intended static methods
  protected abstract fromJsonLogic(json: object | string): Entity;
  protected abstract isEntity(json: object | string): boolean;

  static fromJsonLogic(json: object | string): Entity {
    const entityClasses = Object.values(this).filter(value => value instanceof Entity)
    for (const entityClass of entityClasses) {
      console.log(entityClass)
      const isEntity = entityClass.isEntity(json)
      if (!isEntity) continue
      return entityClass.fromJsonLogic(json)
    }
    throw new Error(`No matching entity found for JSON: ${JSON.stringify(json)}`)
  }
}

