import { z } from "zod"
import { CourseTopicCreateSchema } from "../../zod"

export const CourseCreateRelationsSchema = z.object({
  departments: z.array(z.string()),
  faculties: z.array(z.string()),
  topics: z.array(CourseTopicCreateSchema.omit({ course_id: true })),
})

export type CourseCreateRelations = z.infer<typeof CourseCreateRelationsSchema>

export const CourseUpdateRelationsSchema = CourseCreateRelationsSchema.partial()

export type CourseUpdateRelations = z.infer<typeof CourseUpdateRelationsSchema>

export const CourseListSchema = z.object({
  keywords: z.string().optional(),
  offset: z.coerce.number().int().min(0).optional(),
  limit: z.coerce.number().int().min(0).max(100).optional(),
})

export type CourseList = z.infer<typeof CourseListSchema>
