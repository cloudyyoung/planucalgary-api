import { z } from "zod"
import {
  CourseOptionalDefaultsSchema,
  CourseTopicCreateWithoutCourseInputSchema,
  CourseTopicUncheckedCreateWithoutCourseInputSchema,
} from "../../zod"

export const CourseCreateInputWithRelationsSchema = z
  .object({
    departments: z.array(z.string()),
    faculties: z.array(z.string()),
    topics: z
      .array(
        z.union([
          z.lazy(() => CourseTopicCreateWithoutCourseInputSchema),
          z.lazy(() => CourseTopicUncheckedCreateWithoutCourseInputSchema),
        ]),
      )
      .optional(),
  })
  .merge(CourseOptionalDefaultsSchema)
