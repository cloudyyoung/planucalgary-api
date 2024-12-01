import { CourseTopic } from "@prisma/client"
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
    data: {
      ...req.body,
      subject_code: undefined,
      subject: {
        connect: { code: req.body.subject_code },
      },
      departments: {
        connect: req.body.departments.map((code: string) => ({ code })),
      },
      faculties: {
        connect: req.body.faculties.map((code: string) => ({ code })),
      },
      topics: {
        connectOrCreate: req.body.topics.map((topic: CourseTopic) => ({
          where: { code: topic.code },
          create: topic,
        })),
      },
    },
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
