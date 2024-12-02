import { z } from "zod"
import { CourseCreateSchema, CourseUpdate } from "../../zod"

export const CourseCreateWithRelationsSchema = CourseCreateSchema.merge({
  departments: z.array(z.string()),
  faculties: z.array(z.string()),
  topics: z.array(
    z.union([
      z.lazy(() => CourseTopicCreateWithoutCourseInputSchema),
      z.lazy(() => CourseTopicUncheckedCreateWithoutCourseInputSchema),
    ]),
  ),
})

export type CourseCreateInputWithRelations = z.infer<typeof CourseCreateWithRelationsSchema>

export const CourseUpdateInputWithRelationsSchema = CourseCreateWithRelationsSchema.partial()

export type CourseUpdateInputWithRelations = z.infer<typeof CourseUpdateInputWithRelationsSchema>
