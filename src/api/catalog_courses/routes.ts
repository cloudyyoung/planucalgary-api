import { Router } from "express"

import { getCourses } from "./controller"

const router = Router()
router.get("/", getCourses)

export default router
export { router }
