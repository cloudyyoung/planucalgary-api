import { Request } from "express"

import { Account, PrismaClient } from "@prisma/client"

export interface AuthenticatedRequest extends Request {
  account?: Account
}

export interface PrismaRequest extends Request {
  prisma: PrismaClient
}
