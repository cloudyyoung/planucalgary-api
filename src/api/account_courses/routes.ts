import { Router } from "express"
import { celebrate } from "celebrate"

import { getAccountCourses, addAccountCourses } from "./controller"
import { addCourseValidator } from "./validators"

const router = Router()

router.get("/", getAccountCourses)
router.post("/", celebrate(addCourseValidator), addAccountCourses)

export default router
export { router }
