import { z } from "zod"

export const ProgramCreateRelationsSchema = z.object({
  departments: z.array(z.string()),
  faculties: z.array(z.string()),
})

export type ProgramCreateRelations = z.infer<typeof ProgramCreateRelationsSchema>

export const ProgramUpdateRelationsSchema = ProgramCreateRelationsSchema.partial()

export type ProgramUpdateRelations = z.infer<typeof ProgramUpdateRelationsSchema>

export const ProgramListSchema = z.object({
  keywords: z.string().optional(),
})

export type ProgramList = z.infer<typeof ProgramListSchema>
