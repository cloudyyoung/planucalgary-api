import { Router } from "express"
import { celebrate } from "celebrate"

import { signin, signup } from "./controllers"
import { signInValidator, signUpValidator } from "./validators"

const router = Router()

router.post("/signin", celebrate(signInValidator), signin)
router.post("/signup", celebrate(signUpValidator), signup)

export default router
export { router }
