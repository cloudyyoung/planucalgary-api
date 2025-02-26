import { Router } from "express"

import { createCourse, deleteCourse, getCourse, listCourses, syncRequisites, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import {
  CourseCreateRelationsSchema,
  CourseListSchema,
  CourseUpdateRelationsSchema,
  SyncRequisitesSchema,
} from "./validators"
import { CourseCreateSchema, CourseUpdateSchema } from "../../zod"

const router = Router()
router.get("/", zod({ query: CourseListSchema }), listCourses)
router.get("/:id", zod({ params: IdInputSchema }), getCourse)
router.post("/", admin(), zod({ body: CourseCreateSchema.merge(CourseCreateRelationsSchema) }), createCourse)
router.put(
  "/:id",
  admin(),
  zod({ params: IdInputSchema, body: CourseUpdateSchema.merge(CourseUpdateRelationsSchema) }),
  updateCourse,
)
router.delete("/:id", admin(), zod({ params: IdInputSchema }), deleteCourse)
router.post("/requisites/sync", admin(), zod({ body: SyncRequisitesSchema }), syncRequisites)

export default router
export { router }
