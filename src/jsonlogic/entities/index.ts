import { RequisiteComponent } from '../requisite_component'
import { Course } from './course'
import { Department } from './department'
import { Faculty } from './faculty'
import { Field } from './field'
import { Level } from './level'
import { Program } from './program'
import { Subject } from './subject'
import { Year } from './year'

RequisiteComponent.registerSubclass(Course)
RequisiteComponent.registerSubclass(Department)
RequisiteComponent.registerSubclass(Faculty)
RequisiteComponent.registerSubclass(Field)
RequisiteComponent.registerSubclass(Level)
RequisiteComponent.registerSubclass(Program)
RequisiteComponent.registerSubclass(Subject)
RequisiteComponent.registerSubclass(Year)

export {
  Course,
  Department,
  Faculty,
  Field,
  Level,
  Program,
  Subject,
  Year
}