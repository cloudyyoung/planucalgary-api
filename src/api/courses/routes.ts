import { Router } from "express"

import { createCourse, getCourse, listCourses, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { CourseUpdateInputSchema } from "../../zod"
import { IdInputSchema, zod } from "../../middlewares"
import { CourseCreateInputWithRelationsSchema } from "./validators"

const router = Router()
router.get("/", admin(), listCourses)
router.get("/:id", admin(), zod({ params: IdInputSchema }), getCourse)
router.post("/", admin(), zod({ body: CourseCreateInputWithRelationsSchema }), createCourse)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: CourseUpdateInputSchema }), updateCourse)

export default router
export { router }
