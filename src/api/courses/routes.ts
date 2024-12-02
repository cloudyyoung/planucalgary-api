import { Router } from "express"

import { createCourse, getCourse, listCourses, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { CourseCreateRelationsSchema, CourseUpdateRelationsSchema } from "./validators"
import { CourseCreateSchema, CourseUpdateSchema } from "../../zod"

const router = Router()
router.get("/", listCourses)
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
