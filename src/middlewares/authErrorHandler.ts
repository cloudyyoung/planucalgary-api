import { Request, Response, NextFunction } from "express"

const authErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid or missing token" })
  } else {
    next(err)
  }
}

export default authErrorHandler
