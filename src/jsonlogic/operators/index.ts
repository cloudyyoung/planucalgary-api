import { RequisiteComponent } from "../requisite_component"
import { Admission } from "./admission"
import { And } from "./and"
import { Consent } from "./consent"
import { Not } from "./not"
import { Or } from "./or"
import { Units } from "./units"

RequisiteComponent.registerSubclass(Admission)
RequisiteComponent.registerSubclass(And)
RequisiteComponent.registerSubclass(Consent)
RequisiteComponent.registerSubclass(Not)
RequisiteComponent.registerSubclass(Or)
RequisiteComponent.registerSubclass(Units)

export {
  Admission,
  And,
  Consent,
  Not,
  Or,
  Units
}