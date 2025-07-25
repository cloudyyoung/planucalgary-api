export abstract class Entity {
  entity: string

  constructor(name: string) {
    this.entity = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): object | string;

  // Intended static methods
  protected abstract fromJsonLogic(json: object | string): Entity;
  protected abstract isEntity(json: object | string): boolean;

  static get fromJsonLogic() {
    return this.prototype.fromJsonLogic
  }

  static get isEntity() {
    return this.prototype.isEntity
  }
}