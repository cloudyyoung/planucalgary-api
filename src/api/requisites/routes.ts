import { Router } from "express"

import { admin } from "../../middlewares/admin"
import { zod } from "../../middlewares"
import { listRequisites, syncRequisites } from "./controllers"
import { SyncRequisitesSchema } from "./validators"

const router = Router()
router.get("/", admin(), listRequisites)
router.post("/sync", admin(), zod({ body: SyncRequisitesSchema }), syncRequisites)

export default router
export { router }
