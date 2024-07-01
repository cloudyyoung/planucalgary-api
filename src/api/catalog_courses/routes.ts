import { Router } from "express"

import { Courses, checkPrereq } from "./controller"

const router = Router()
router.get("/", Courses)
router.get("/checkPrereq", checkPrereq)

export default router
export { router }
