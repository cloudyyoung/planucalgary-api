import { Request, Response } from "express"
import { CatalogCourse } from "./model"
import { jwtDecode } from "jwt-decode"
import JwtContent from "../account_courses/interfaces"
import { Accounts } from "../accounts/models"
export const Courses = async (req: Request, res: Response) => {
  try {
    const allCourses = await CatalogCourse.find({}).limit(10)
    return res.status(200).json({ message: allCourses })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Something went wrong." })
  }
}

export const checkPrereq = async (req: Request, res: Response) => {
  const { token, course_id } = req.body
  const decoded = jwtDecode<JwtContent>(token)
  const account_id = decoded.payload.user.id
  if (!token || !course_id) {
    return res.status(400).json({ error: "Missing attributes." })
  }

  const checkAccount = await Accounts.findById({ _id: account_id })
  if (!checkAccount) {
    return res.status(400).json({ error: "Account does not exist." })
  }

  const checkCourse = await CatalogCourse.findOne({ coursedog_id: course_id })
  if (!checkCourse) {
    return res.status(400).json({ error: "Course does not exist." })
  }

  //const checkPrereq = processPrereq(checkCourse.prereq ?? "")
  return res.status(200).json({ status: checkPrereq })
}
