import { PrismaClient } from "@prisma/client"
import { DB_URI } from "./config"

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DB_URI,
    },
  },
})
