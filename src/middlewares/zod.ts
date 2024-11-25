import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"

export interface ZodmiddlewareOptions {
  body?: ZodSchema
}

export const zod = (options: ZodmiddlewareOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (options.body) {
      const parsed = options.body.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors }).end()
      }
      req.body = parsed.data
    }
    next()
  }
}
