interface CourseDocument {
  active: boolean
  aka: string | null
  antireq: string | null
  career: string | null
  cid: string | null
  code: string | null
  components: string[]
  coreq: string | null
  course_group_id: string | null
  course_number: string | null
  coursedog_id: string | null
  credits: number | null
  departments: string[]
  description: string | null
  faculty_code: string | null
  faculty_name: string | null
  grade_mode_code: string | null
  grade_mode_name: string | null
  long_name: string | null
  multi_term: boolean
  name: string | null
  nogpa: boolean
  notes: string | null
  prereq: string | null
  repeatable: boolean
  requisites: object
  start_term: object
  subject_code: string | null
  topics: object[]
  version: number
}

export { CourseDocument }
