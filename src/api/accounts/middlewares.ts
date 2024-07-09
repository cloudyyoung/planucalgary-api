import { NextFunction, Request, Response } from "express"
import { Request as JWTRequest } from "express-jwt"

import { Account } from "../../models"
import { AuthenticatedRequest } from "../../interfaces"

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as JWTRequest).auth
    if (auth) {
      const account = await Account.findOne({ _id: auth.id })
      if (account) {
        ;(req as AuthenticatedRequest).account = account
      }
    }
    next()
  }
}
