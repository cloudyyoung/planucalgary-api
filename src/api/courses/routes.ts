import { Router } from "express"

import { createCourse, getCourse, listCourses, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { CourseCreateWithRelationsSchema, CourseUpdateInputWithRelationsSchema } from "./validators"

const router = Router()
router.get("/", listCourses)
router.get("/:id", zod({ params: IdInputSchema }), getCourse)
router.post("/", admin(), zod({ body: CourseCreateWithRelationsSchema }), createCourse)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: CourseUpdateInputWithRelationsSchema }), updateCourse)

export default router
export { router }
