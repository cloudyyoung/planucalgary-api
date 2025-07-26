export abstract class Entity<T> {
  static subclasses = new Set<typeof Entity<any>>()

  entity: string

  constructor(name: string) {
    this.entity = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): T;

  // Intended static methods
  protected abstract fromJsonLogic(json: T): Entity<T>;
  protected abstract isEntity(json: object | string): boolean;

  static fromJsonLogic(json: object | string): Entity<object | string> {
    if (this.prototype.fromJsonLogic) {
      return this.prototype.fromJsonLogic(json)
    }

    for (const subclass of Entity.subclasses) {
      if (subclass.isEntity(json)) {
        return subclass.fromJsonLogic(json)
      }
    }

    throw new Error(`Invalid JSON: ${JSON.stringify(json)}`)
  }

  static isEntity(json: object | string): boolean {
    if (this.prototype.isEntity) {
      return this.prototype.isEntity(json)
    }

    throw new Error("This method cannot be called on the base Entity class")
  }

  static registerSubclass(subclass: typeof Entity<any>) {
    this.subclasses.add(subclass)
  }
}