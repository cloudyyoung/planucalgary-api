import { Router } from "express"

import { createFaculty, getFaculty, listFaculties, updateFaculty } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { FacultyCreateInputSchema, FacultyUpdateInputSchema } from "./validators"

const router = Router()
router.get("/", listFaculties)
router.get("/:id", zod({ params: IdInputSchema }), getFaculty)
router.post("/", admin(), zod({ body: FacultyCreateInputSchema }), createFaculty)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: FacultyUpdateInputSchema.partial() }), updateFaculty)

export default router
export { router }
