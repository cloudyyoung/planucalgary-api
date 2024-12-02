import { Request, Response } from "express"
import { CourseCreateInputWithRelations, CourseUpdateInputWithRelations } from "./validators"
import { ParamsDictionary } from "express-serve-static-core"
import { JsonValueType } from "../../zod/inputTypeSchemas/JsonValueSchema"

export const listCourses = async (req: Request, res: Response) => {
  const courses = await req.prisma.course.findMany()
  return res.json(courses)
}

export const getCourse = async (req: Request, res: Response) => {
  const course = await req.prisma.course.findUnique({
    where: { id: req.params.id },
    include: {
      subject: true,
      departments: true,
      faculties: true,
      topics: true,
    },
  })
  return res.json(course)
}

export const createCourse = async (
  req: Request<ParamsDictionary, unknown, CourseCreateInputWithRelations>,
  res: Response,
) => {
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
        create: req.body.topics,
      },
      prereq_json: parseJson(req.body.prereq_json),
      antireq_json: parseJson(req.body.antireq_json),
      coreq_json: parseJson(req.body.coreq_json),
    },
  })
  return res.json(course)
}

export const updateCourse = async (
  req: Request<ParamsDictionary, unknown, CourseUpdateInputWithRelations>,
  res: Response,
) => {
  const course = await req.prisma.course.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
      subject_code: undefined,
      subject: {
        connect: req.body.subject_code ? { code: req.body.subject_code } : undefined,
      },
      departments: {
        connect: req.body.departments?.map((code: string) => ({ code })),
      },
      faculties: {
        connect: req.body.faculties?.map((code: string) => ({ code })),
      },
      topics: {
        connectOrCreate: req.body.topics?.map((topic) => ({
          where: { number: topic.number, course_id: req.params.id },
          create: topic,
        })),
      },
      prereq_json: parseJson(req.body.prereq_json),
      antireq_json: parseJson(req.body.antireq_json),
      coreq_json: parseJson(req.body.coreq_json),
    },
  })
  return res.json(course)
}

const parseJson = (json: undefined | JsonValueType) => {
  if (!json) return undefined
  return JSON.parse(JSON.stringify(json))
}
