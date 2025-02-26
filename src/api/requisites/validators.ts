import { z } from "zod"

export const SyncRequisitesSchema = z.object({
  destination: z.enum(["requisites_jsons", "courses"]),
})

export type SyncRequisites = z.infer<typeof SyncRequisitesSchema>
