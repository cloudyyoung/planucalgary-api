import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { FacultyCreate, FacultyUpdate } from "../../zod"

export const listSubjects = async (req: Request, res: Response) => {
  const subjects = await req.prisma.subject.findMany()
  return res.json(subjects)
}

export const getSubject = async (req: Request, res: Response) => {
  const subject = await req.prisma.subject.findUnique({
    where: { id: req.params.id },
    include: {
      departments: true,
      courses: true,
    },
  })
  return res.json(subject)
}

export const createSubject = async (req: Request<ParamsDictionary, any, FacultyCreate>, res: Response) => {
  const subject = await req.prisma.faculty.create({ data: req.body })
  return res.json(subject)
}

export const updateSubject = async (req: Request<ParamsDictionary, any, FacultyUpdate>, res: Response) => {
  const subject = await req.prisma.faculty.update({
    where: { id: req.params.id },
    data: req.body,
  })
  return res.json(subject)
}

export const deleteSubject = async (req: Request, res: Response) => {
  const subject = await req.prisma.faculty.delete({
    where: { id: req.params.id },
  })
  return res.json(subject)
}
