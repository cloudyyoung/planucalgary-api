import { Request, Response } from "express"

export const createCourse = async (req: Request, res: Response) => {
  console.log("createCourse")
  const course = await req.prisma.course.create({
    data: req.body,
  })
  return res.json(course)
}
