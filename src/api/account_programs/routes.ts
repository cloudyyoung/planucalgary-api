import { Router } from "express"
import { getAccountPrograms, addAccountProgram } from "./controller"

const router = Router()

router.get("/", getAccountPrograms)
router.post("/", addAccountProgram)

export default router
export { router }
