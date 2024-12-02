import { z } from "zod"

export const FacultyCreateInputSchema = z.object({
  name: z.string(),
  code: z.string(),
})

export type FacultyCreateInput = z.infer<typeof FacultyCreateInputSchema>

export const FacultyUpdateInputSchema = FacultyCreateInputSchema.partial()

export type FacultyUpdateInput = z.infer<typeof FacultyUpdateInputSchema>
