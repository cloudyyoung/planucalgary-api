import { z } from "zod"
import {
  CourseTopicCreateWithoutCourseInputSchema,
  CourseTopicUncheckedCreateWithoutCourseInputSchema,
  DepartmentWhereUniqueInputSchema,
  FacultyWhereUniqueInputSchema,
  SubjectCreateWithoutCoursesInputSchema,
  SubjectUncheckedCreateWithoutCoursesInputSchema,
} from "../../zod"

export const CourseCreateInputWithRelationsSchema = z.object({
  subject: z.union([
    z.lazy(() => SubjectCreateWithoutCoursesInputSchema),
    z.lazy(() => SubjectUncheckedCreateWithoutCoursesInputSchema),
  ]),
  departments: z
    .union([z.lazy(() => DepartmentWhereUniqueInputSchema), z.lazy(() => DepartmentWhereUniqueInputSchema).array()])
    .optional(),
  faculties: z
    .union([z.lazy(() => FacultyWhereUniqueInputSchema), z.lazy(() => FacultyWhereUniqueInputSchema).array()])
    .optional(),
  topics: z
    .array(
      z.union([
        z.lazy(() => CourseTopicCreateWithoutCourseInputSchema),
        z.lazy(() => CourseTopicUncheckedCreateWithoutCourseInputSchema),
      ]),
    )
    .optional(),
})
