import { Router } from "express"
import { getAccountPrograms, AddAccountPrograms } from "./controller"
import authMiddleware from "../../middlewares/auth"

const router = Router()

router.use(authMiddleware)

router.get("/", getAccountPrograms)
router.post("/", AddAccountPrograms)

export default router
export { router }
