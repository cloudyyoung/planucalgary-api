import { Express } from "express"
import mongooseLoader from "./mongoose"
import expressLoader from "./express"
import generateTypes from "./mtgen"

export default async (app: Express) => {
  await generateTypes()
  await mongooseLoader()
  expressLoader(app)
}
