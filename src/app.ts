import express from "express"
import "reflect-metadata"
import { PORT } from "./config"
import loader from "./loaders/index"

const app = express()

loader(app)

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

export default app
