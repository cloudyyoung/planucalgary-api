export default interface Account {
  id: string
  email: string
  username: string
}

export interface StudentRecordCourse {
  code: string
  name: string
  units: number
}

export interface StudentRecord {
  courses: StudentRecordCourse[]
  programs: string[]
}
