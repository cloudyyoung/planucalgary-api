import { Express } from "express"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import bodyParser, { json } from "body-parser"

import { router as programsRouter } from "../api/catalog_programs/routes"
import { router as userRouter } from "../api/accounts/routes"
import { router as accountProgramRouter } from "../api/account_programs/routes"
import { router as accountCoursesRouter } from "../api/account_courses/routes"
import { router as courseRouter } from "../api/catalog_courses/routes"

export default (app: Express) => {
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
  app.disable("x-powered-by")
  app.disable("etag")

  app.use("/programs", programsRouter)
  app.use("/account", userRouter)
  app.use("/accountPrograms", accountProgramRouter)
  app.use("/accountCourses", accountCoursesRouter)
  app.use("/courses", courseRouter)

  app.get("/", (_req, res) => {
    return res.status(200).json({ message: "ok" }).end()
  })
}
