import { Response } from "express"

import { AuthenticatedRequest } from "../../interfaces"
import { CatalogCourse } from "../../models"

import { CourseEnrolledError, CourseNotExistsError } from "./errors"

interface CourseId {
  id: string
  term: string
}

export const getAccountCourses = async (req: AuthenticatedRequest, res: Response) => {
  const account = req.account!
  const courseIds: CourseId[] = account.courses.map((x) => x.id)
  const courses = await CatalogCourse.find({ coursedog_id: { $in: courseIds } })
  return res.status(200).json({ courses })
}

export const addAccountCourses = async (req: AuthenticatedRequest, res: Response) => {
  const { course_id: course_coursedog_id, term } = req.body
  const course = await CatalogCourse.findOne({ coursedog_id: course_coursedog_id })
  if (!course) {
    throw new CourseNotExistsError()
  }

  const account = req.account!
  if (account.courses.some((x) => x.id === course_coursedog_id.toString())) {
    throw new CourseEnrolledError()
  }

  const courseObj: CourseId = {
    id: course_coursedog_id,
    term: term,
  }

  account.courses.push(courseObj)
  account.save()
  return res.status(200).json()
}
