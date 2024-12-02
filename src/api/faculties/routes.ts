import { Router } from "express"

import { createFaculty, getFaculty, listFaculties, updateFaculty } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { FacultyCreateSchema, FacultyUpdateSchema } from "../../zod"

const router = Router()
router.get("/", listFaculties)
router.get("/:id", zod({ params: IdInputSchema }), getFaculty)
router.post("/", admin(), zod({ body: FacultyCreateSchema }), createFaculty)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: FacultyUpdateSchema }), updateFaculty)

export default router
export { router }
