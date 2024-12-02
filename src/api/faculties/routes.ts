import { Router } from "express"

import { createFaculty, getFaculty, listFaculties, updateFaculty } from "./controllers"
import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { FacultyOptionalDefaultsSchema } from "../../zod"

const router = Router()
router.get("/", listFaculties)
router.get("/:id", zod({ params: IdInputSchema }), getFaculty)
router.post("/", admin(), zod({ body: FacultyOptionalDefaultsSchema }), createFaculty)
router.put("/:id", admin(), zod({ params: IdInputSchema, body: FacultyOptionalDefaultsSchema }), updateFaculty)

export default router
export { router }
