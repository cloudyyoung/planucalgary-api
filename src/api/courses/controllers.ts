import { Request, Response } from "express"

export const listCourses = async (req: Request, res: Response) => {
  const courses = await req.prisma.course.findMany()
  return res.json(courses)
}

export const getCourse = async (req: Request, res: Response) => {
  const course = await req.prisma.course.findUnique({
    where: { id: req.params.id },
  })
  return res.json(course)
}

export const createCourse = async (req: Request, res: Response) => {
  const course = await req.prisma.course.create({
    data: req.body,
  })
  return res.json(course)
}

export const updateCourse = async (req: Request, res: Response) => {
  const course = await req.prisma.course.update({
    where: { id: req.params.id },
    data: req.body,
  })
  return res.json(course)
}
