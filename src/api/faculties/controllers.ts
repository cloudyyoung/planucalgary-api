import { CourseTopic } from "@prisma/client"
import { Request, Response } from "express"

export const listFaculties = async (req: Request, res: Response) => {
  const faculties = await req.prisma.faculty.findMany()
  return res.json(faculties)
}

export const getFaculty = async (req: Request, res: Response) => {
  const fac = await req.prisma.faculty.findUnique({
    where: { id: req.params.id },
    include: {
      departments: true,
      courses: true,
    },
  })
  return res.json(fac)
}

export const createFaculty = async (req: Request, res: Response) => {
  const fac = await req.prisma.faculty.create({
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
        create: req.body.topics,
      },
    },
  })
  return res.json(fac)
}

export const updateFaculty = async (req: Request, res: Response) => {
  const fac = await req.prisma.faculty.update({
    where: { id: req.params.id },
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
          where: { number: topic.number, course_id: req.params.id },
          create: topic,
        })),
      },
    },
  })
  return res.json(fac)
}
