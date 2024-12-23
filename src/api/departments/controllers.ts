import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { FacultyCreate, FacultyUpdate } from "../../zod"

export const listDepartments = async (req: Request, res: Response) => {
  const faculties = await req.prisma.faculty.findMany()
  return res.json(faculties)
}

export const getDepartment = async (req: Request, res: Response) => {
  const fac = await req.prisma.faculty.findUnique({
    where: { id: req.params.id },
    include: {
      departments: true,
      courses: true,
    },
  })
  return res.json(fac)
}

export const createDepartment = async (req: Request<ParamsDictionary, any, FacultyCreate>, res: Response) => {
  const fac = await req.prisma.faculty.create({ data: req.body })
  return res.json(fac)
}

export const updateDepartment = async (req: Request<ParamsDictionary, any, FacultyUpdate>, res: Response) => {
  const fac = await req.prisma.faculty.update({
    where: { id: req.params.id },
    data: req.body,
  })
  return res.json(fac)
}

export const deleteDepartment = async (req: Request, res: Response) => {
  const fac = await req.prisma.faculty.delete({
    where: { id: req.params.id },
  })
  return res.json(fac)
}
