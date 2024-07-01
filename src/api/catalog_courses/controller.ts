import { Request, Response } from "express"
import { CatalogCourse } from "../../models/"
import { jwtDecode } from "jwt-decode"
import JwtContent from "../../models/interfaces"
import { Account } from "../../models/account"
import { course, courseData } from "../../models/interfaces"
import { CatalogProgram } from "../../models/catalog_program"
import JsonLogic from "../../jsonLogic/jsonLogic"
import { CatalogCourse as CourseReturn, AccountDocument } from "../../models/interfaces.gen"

export const Courses = async (req: Request, res: Response) => {
  try {
    const allCourses = await CatalogCourse.find({}).limit(30)
    return res.status(200).json(allCourses)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Something went wrong." })
  }
}

export const checkReq = async (checkAccount: AccountDocument, checkCourse: CourseReturn) => {
  const courseIds: string[] = checkAccount.courses.map((x) => x.id)
  console.log(courseIds)
  const courseList: courseData[] = await CatalogCourse.find({ coursedog_id: { $in: courseIds } })
    .select("code course_number credits faculty_code departments -_id")
    .lean()

  const courseListFinal: course[] = courseList.map((x: courseData) => ({
    code: x.code,
    number: x.course_number,
    unit: x.credits,
    faculty: x.faculty_code,
    departments: x.departments,
  }))

  const programIds = checkAccount.programs
  const ProgramList = await CatalogProgram.find({ _id: { $in: programIds } })
    .select("code -_id")
    .lean()

  const combined = {
    courses: courseListFinal,
    programs: ProgramList,
  }

  /* Add json logic function part here */
  const result =
    Boolean(JsonLogic.apply(checkCourse.prereq, combined)) && Boolean(!JsonLogic.apply(checkCourse.antireq, combined))
  console.log(checkCourse.prereq)
  return { result: result, prereq: checkCourse.prereq, antireq: checkCourse.antireq, combined: combined }
}

// testing endpoint
export const checkPrereq = async (req: Request, res: Response) => {
  const { token, course_id } = req.body
  const decoded = jwtDecode<JwtContent>(token)
  //console.log(decoded)
  const account_id = decoded.id
  if (!token || !course_id) {
    return res.status(400).json({ error: "Missing attributes." })
  }

  //console.log(account_id)
  const checkAccount = await Account.findById({ _id: account_id })
  if (!checkAccount) {
    return res.status(400).json({ error: "Account does not exist." })
  }

  const checkCourse = await CatalogCourse.findOne({ coursedog_id: course_id })
  if (!checkCourse) {
    return res.status(400).json({ error: "Course does not exist." })
  }
  console.log(checkCourse)
  if (
    checkCourse.prereq === undefined &&
    checkCourse.antireq === undefined //||
  ) {
    return res.status(400).json({ status: true })
  }

  return res.status(200).json(await checkReq(checkAccount, checkCourse))
}
// open main.py under bianco,
// Run the script. It will create course anti/pre/co-req.
// Process the prereq json logic
