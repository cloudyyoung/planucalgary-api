interface CatalogCourse {
  active: boolean
  aka: string | null
  antireq: object | null
  antireq_text: string | null
  career: string | null
  cid: string | null
  code: string | null
  components: string[]
  coreq: object | null
  coreq_text: string | null
  course_group_id: string | null
  course_number: string | null
  coursedog_id: string | null
  units: number | null
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
  prereq: object | null
  prereq_text: string | null
  repeatable: boolean
  requisites: object[]
  start_term: {
    id: string
    year: number
    term: string
  }
  subject_code: string | null
  topics: object[]
  version: number
}

export { CatalogCourse }
