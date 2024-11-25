import { Request, Response } from "express"

export const createCourse = async (req: Request, res: Response) => {
  const course = await req.prisma.course.create({
    data: req.body,
  })
  return res.json(course)
}
