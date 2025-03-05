import { Router } from "express"

import { createCourse, deleteCourse, getCourse, listPrograms, updateCourse } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { ProgramCreateSchema, ProgramUpdateSchema } from "../../zod"

const router = Router()
router.get("/", zod({ query: ProgramCreateSchema }), listPrograms)
router.get("/:id", zod({ params: IdInputSchema }), getCourse)
router.post("/", admin(), zod({ body: ProgramCreateSchema }), createCourse)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: ProgramUpdateSchema }), updateCourse)
router.delete("/:id", admin(), zod({ params: IdInputSchema }), deleteCourse)

export default router
export { router }
