import "reflect-metadata"
import express, { Express } from "express"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import { json, urlencoded } from "body-parser"
import { expressjwt as jwt } from "express-jwt"
import "express-async-errors"

import { router as accountRouter } from "./api/accounts/routes"
import { router as courseRouter } from "./api/courses/routes"
import { router as facultyRouter } from "./api/faculties/routes"
import { router as subjectRouter } from "./api/subjects/routes"
import { router as departmentRouter } from "./api/departments/routes"

import { PORT, JWT_SECRET_KEY } from "./config"
import { auth, errors, pagination, prisma } from "./middlewares"
import { emptyget } from "./middlewares/empty-get"

const load = async (app: Express) => {
  process.on("uncaughtException", async (error) => {
    console.log(error)
  })

  process.on("unhandledRejection", async (ex) => {
    console.log(ex)
  })

  app.enable("trust proxy")
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.use(cors())
  app.use(morgan("dev"))
  app.use(helmet())
  app.use(compression())
  app.use(prisma())
  app.use(
    jwt({ secret: JWT_SECRET_KEY!, algorithms: ["HS256"], issuer: "plan-ucalgary-api" }).unless({
      path: ["/accounts/signin", "/accounts/signup"],
    }),
    auth(),
  )
  app.use(emptyget())
  app.use(pagination())
  app.disable("x-powered-by")
  app.disable("etag")

  app.use("/accounts", accountRouter)
  app.use("/courses", courseRouter)
  app.use("/faculties", facultyRouter)
  app.use("/subjects", subjectRouter)
  app.use("/departments", departmentRouter)

  app.get("/", (_req, res) => {
    return res.status(200).json({ message: "ok" }).end()
  })

  app.use(errors())

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  })
}

const app = express()
load(app)

export default app
