import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { FacultyOptionalDefaults } from "../../zod"

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

export const createFaculty = async (
  req: Request<ParamsDictionary, any, FacultyOptionalDefaults>,
  res: Response,
) => {
  const fac = await req.prisma.faculty.create({ data: req.body })
  return res.json(fac)
}

export const updateFaculty = async (
  req: Request<ParamsDictionary, any, FacultyOptionalDefaults>,
  res: Response,
) => {
  const fac = await req.prisma.faculty.update({
    where: { id: req.params.id },
    data: req.body,
  })
  return res.json(fac)
}
