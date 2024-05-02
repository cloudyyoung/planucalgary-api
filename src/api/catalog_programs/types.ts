interface CatalogProgramDocument {
  active: boolean
  admission_info: string
  career: string
  code: string
  coursedog_id: string
  degree_designation_code: string
  degree_designation_name: string
  departments: string[]
  display_name: string
  general_info: string
  long_name: string
  name: string
  program_group_id: string
  requisites: object[]
  start_term: Map<string, unknown>
  transcript_description: string
  transcript_level: string
  type: string
  version: number
}

export type { CatalogProgramDocument }
