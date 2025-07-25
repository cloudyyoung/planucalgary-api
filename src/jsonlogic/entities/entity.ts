export abstract class Entity<T> {
  entity: string

  constructor(name: string) {
    this.entity = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): T;

  // Intended static methods
  protected abstract fromJsonLogic(json: T): Entity<T>;
  protected abstract isEntity(json: object | string): boolean;

  static get fromJsonLogic() {
    return this.prototype.fromJsonLogic
  }

  static get isEntity() {
    return this.prototype.isEntity
  }
}