import { Router } from "express"

import { createCourse, getCourse, listCourses, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { CourseCreateRelationsSchema, CourseListSchema, CourseUpdateRelationsSchema } from "./validators"
import { CourseCreateSchema, CourseUpdateSchema } from "../../zod"

const router = Router()
router.get("/", zod({ params: CourseListSchema }), listCourses)
router.get("/:id", zod({ params: IdInputSchema }), getCourse)
router.post("/", admin(), zod({ body: CourseCreateSchema.merge(CourseCreateRelationsSchema) }), createCourse)
router.put(
  "/:id",
  admin(),
  zod({ params: IdInputSchema, body: CourseUpdateSchema.merge(CourseUpdateRelationsSchema) }),
  updateCourse,
)

export default router
export { router }
