import { z } from "zod"

export const RequisitesSyncSchema = z.object({
  destination: z.enum(["requisites_jsons", "courses"]),
})

export type RequisitesSync = z.infer<typeof RequisitesSyncSchema>

export const RequisiteUpdateSchema = z.object({
  json: z.record(z.any()),
})

export type RequisiteUpdate = z.infer<typeof RequisiteUpdateSchema>
