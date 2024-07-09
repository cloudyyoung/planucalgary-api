import { Router } from "express"
import { getAccountPrograms, addAccountPrograms } from "./controller"

const router = Router()

router.get("/", getAccountPrograms)
router.post("/", addAccountPrograms)

export default router
export { router }
