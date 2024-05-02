import { Router } from "express"
import { getPrograms, getProgram } from "./controller"

const router = Router()

router.get("/", getPrograms)
router.get("/:id", getProgram)

export default router
export { router }
