import "reflect-metadata"
import express, { Express, Request, Response, NextFunction } from "express"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import bodyParser, { json } from "body-parser"
import { expressjwt as jwt } from "express-jwt"
import "express-async-errors"
import { errors } from "celebrate"

import { router as accountRouter } from "./api/accounts/routes"

import { PORT, JWT_SECRET_KEY } from "./config"
import { auth } from "./api/accounts/middlewares"

const load = async (app: Express) => {
  process.on("uncaughtException", async (error) => {
    console.log(error)
  })

  process.on("unhandledRejection", async (ex) => {
    console.log(ex)
  })

  app.enable("trust proxy")
  app.use(json())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(morgan("dev"))
  app.use(helmet())
  app.use(compression())
  app.use(
    jwt({ secret: JWT_SECRET_KEY!, algorithms: ["HS256"], issuer: "plan-ucalgary-api" }).unless({
      path: ["/accounts/signin", "/accounts/signup"],
    }),
    auth(),
  )
  app.disable("x-powered-by")
  app.disable("etag")

  app.use("/accounts", accountRouter)

  app.get("/", (_req, res) => {
    return res.status(200).json({ message: "ok" }).end()
  })

  app.use(errors())
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ statusCode: 401, error: "UnauthorizedError", message: err.message }).end()
    } else {
      res.status(400).json({ statusCode: 400, error: err.name, message: err.message }).end()
    }
    next(err)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  })
}

const app = express()
load(app)

export default app
