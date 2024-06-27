import { Router } from "express"
import { getAccountCourses, AddAccountCourses } from "./controller"
import authMiddleware from "../../middlewares/auth"

const router = Router()

router.use(authMiddleware)

router.get("/", getAccountCourses)
router.post("/", AddAccountCourses)

export default router
export { router }
