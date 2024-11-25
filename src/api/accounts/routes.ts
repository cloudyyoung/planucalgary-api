import { Router } from "express"

import { signin } from "./controllers/signin"
import { signup } from "./controllers/signup"

const router = Router()

router.post("/signin", signin)
router.post("/signup", signup)

export default router
export { router }
