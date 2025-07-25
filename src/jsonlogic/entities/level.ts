import { Entity } from "../entities/entity"

export type LevelString = string
export type LevelEntity = { level: LevelString }

/**
 * Represents a level entity.
 * This class extends the Entity class and provides methods to handle level-specific logic.
 * @format { level: LevelString }
 */
export class Level extends Entity<LevelEntity> {
  level_string: LevelString

  constructor(level: LevelString) {
    super("level")

    this.level_string = level
  }

  toNaturalLanguage(): string {
    return `the level of ${this.level_string}`
  }

  toJsonLogic(): LevelEntity {
    return { level: this.level_string }
  }

  protected fromJsonLogic(json: LevelEntity): Level {
    if (!Level.isEntity(json)) {
      throw new Error(`Invalid JSON for "level" entity: ${JSON.stringify(json)}`)
    }
    return new Level(json.level)
  }

  protected isEntity(json: object | string): boolean {
    if (typeof json !== 'object' || json === null) return false
    return 'level' in json
  }
}
