import { NextFunction, Response, Request } from "express"
import { PrismaClient } from "@prisma/client"

export const prisma_client = new PrismaClient()

export const prisma = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma_client
    next()
  }
}

declare module "express-serve-static-core" {
  interface Request {
    prisma: PrismaClient
  }
}
