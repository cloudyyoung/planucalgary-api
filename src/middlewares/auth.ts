import { expressjwt } from "express-jwt"

const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET_KEY || "default-secret-key",
  algorithms: ["HS256"],
})

export default authMiddleware
