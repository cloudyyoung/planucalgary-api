export interface JsonLogicCourse {
  course: string
}

export interface CoursesOperatorBody {
  required: number
  from?: JsonLogicCourse[]
}

export interface UnitsOperatorBody {
  required: number
  from?: JsonLogicCourse[]
}
