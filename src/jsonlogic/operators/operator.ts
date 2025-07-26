export abstract class Operator<T> { 
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): T;

  // Intended static methods
  protected abstract isEntity(json: object | string): boolean;
  protected abstract fromJsonLogic(json: T): Operator<T>;

  static get fromJsonLogic() {
    return this.prototype.fromJsonLogic
  }

  static get isEntity() {
    return this.prototype.isEntity
  }
}
