import { NextFunction, Response, Request } from "express"
import { PrismaClient } from "@prisma/client"
import { PrismaRequest } from "./interfaces"

export const prisma_client = new PrismaClient()

export const prisma = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    ;(req as PrismaRequest).prisma = prisma_client
    next()
  }
}
