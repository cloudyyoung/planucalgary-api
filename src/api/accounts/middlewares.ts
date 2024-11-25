import { NextFunction, Request, Response } from "express"
import { Request as JWTRequest } from "express-jwt"

import { AuthenticatedRequest } from "../../interfaces"
import { prisma } from "../../prisma"

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as JWTRequest).auth
    if (auth) {
      const account = await prisma.account.findFirst({
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
