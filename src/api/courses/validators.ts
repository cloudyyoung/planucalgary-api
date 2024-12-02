import { z } from "zod"
import { CourseTopicCreateSchema } from "../../zod"

export const CourseCreateRelationsSchema = z.object({
  departments: z.array(z.string()),
  faculties: z.array(z.string()),
  topics: z.array(CourseTopicCreateSchema),
})

export type CourseCreateRelations = z.infer<typeof CourseCreateRelationsSchema>

export const CourseUpdateRelationsSchema = CourseCreateRelationsSchema.partial()

export type CourseUpdateRelations = z.infer<typeof CourseUpdateRelationsSchema>
