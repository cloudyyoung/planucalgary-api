import { Router } from "express"

import { createSubject, getSubject, listSubjects, updateSubject } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { FacultyCreateSchema, FacultyUpdateSchema } from "../../zod"

const router = Router()
router.get("/", listSubjects)
router.get("/:id", zod({ params: IdInputSchema }), getSubject)
router.post("/", admin(), zod({ body: FacultyCreateSchema }), createSubject)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: FacultyUpdateSchema }), updateSubject)

export default router
export { router }
