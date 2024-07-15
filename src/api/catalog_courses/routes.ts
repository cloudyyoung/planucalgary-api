import { Router } from "express"

import { getCourses, checkPrereq } from "./controller"

const router = Router()
router.get("/", getCourses)
router.get("/checkPrereq", checkPrereq)

export default router
export { router }
