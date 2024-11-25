import { NextFunction, Request, Response } from "express"
import { Request as JWTRequest } from "express-jwt"

import { AuthenticatedRequest, PrismaRequest } from "../../interfaces"

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as JWTRequest).auth
    if (auth) {
      const account = await (req as PrismaRequest).prisma.account.findFirst({
        where: {
          id: auth.id,
        },
      })
      if (account) {
        ;(req as AuthenticatedRequest).account = account
      }
    }
    next()
  }
}
