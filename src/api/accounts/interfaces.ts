
export interface StudentRecordCourse {
  code: string
  name: string
  units: number
}

export interface StudentRecord {
  courses: StudentRecordCourse[]
  programs: string[]
}
