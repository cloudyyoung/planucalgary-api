import { Router } from "express"

import { createCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { CourseCreateInputSchema } from "../../zod"
import { zod } from "../../middlewares"

const router = Router()
router.post("/", admin(), zod({ body: CourseCreateInputSchema }), createCourse)

export default router
export { router }
