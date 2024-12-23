import { Router } from "express"

import { createCourse, deleteCourse, getCourse, listCourses, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { CourseCreateRelationsSchema, CourseListSchema, CourseUpdateRelationsSchema } from "./validators"
import { CourseCreateSchema, CourseUpdateSchema } from "../../zod"
import { generatePrereq } from "../utils/openai"

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
router.delete("/:id", admin(), zod({ params: IdInputSchema }), deleteCourse)
router.post("/:id/requisites", admin(), zod({ params: IdInputSchema }), generatePrereq)

export default router
export { router }
