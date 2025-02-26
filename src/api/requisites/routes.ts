import { Router } from "express"

import { admin } from "../../middlewares/admin"
import { IdInputSchema, zod } from "../../middlewares"
import { generateRequisiteChoices, getRequisite, listRequisites, syncRequisites, updateRequisite } from "./controllers"
import { RequisitesSyncSchema } from "./validators"

const router = Router()
router.get("/", admin(), listRequisites)
router.post("/sync", admin(), zod({ body: RequisitesSyncSchema }), syncRequisites)

router.get("/:id", admin(), zod({ params: IdInputSchema }), getRequisite)
router.post("/:id", admin(), zod({ params: IdInputSchema }), generateRequisiteChoices)
router.put("/:id", admin(), zod({ params: IdInputSchema }), updateRequisite)

export default router
export { router }
