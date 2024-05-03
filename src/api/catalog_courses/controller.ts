import { Request, Response } from "express"
import { CatalogCourse } from "./model"
export const Courses = async (req: Request, res: Response) => {
  try {
    const allCourses = await CatalogCourse.find({}).limit(10)
    return res.status(200).json({ message: allCourses })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Something went wrong." })
  }
}
