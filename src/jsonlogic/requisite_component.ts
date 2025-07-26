export abstract class RequisiteComponent<T> {
  static subclasses = new Set<typeof RequisiteComponent>()
  static registerSubclass(subclass: any) {
    this.subclasses.add(subclass)
  }
  
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract toNaturalLanguage(): string;
  abstract toJsonLogic(): T;

  // Intended static methods
  protected abstract fromJsonLogic(json: T): RequisiteComponent<T>;
  protected abstract isObject(json: object | string): boolean;

  static fromJsonLogic(json: object | string): RequisiteComponent<object | string> {
    if (this.prototype.fromJsonLogic) {
      return this.prototype.fromJsonLogic(json)
    }
    console.log(RequisiteComponent.subclasses)

    for (const subclass of RequisiteComponent.subclasses) {
      if (subclass.isObject(json)) {
        return subclass.fromJsonLogic(json)
      }
    }

    throw new Error(`Invalid JSON: ${JSON.stringify(json)}`)
  }

  static isObject(json: object | string): boolean {
    if (this.prototype.isObject) {
      return this.prototype.isObject(json)
    }

    for (const subclass of RequisiteComponent.subclasses) {
      if (subclass.isObject(json)) {
        return true
      }
    }

    return false
  }
}