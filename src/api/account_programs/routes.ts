import { Router } from "express"
import { celebrate } from "celebrate"

import { getAccountPrograms, addAccountProgram } from "./controller"
import { addProgramValidator } from "./validators"

const router = Router()

router.get("/", getAccountPrograms)
router.post("/", celebrate(addProgramValidator), addAccountProgram)

export default router
export { router }
