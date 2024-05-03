import { Router } from "express"
import { Courses } from "./controller"

const router = Router()

router.get("/", Courses)

export default router
export { router }
