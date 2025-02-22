import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { CourseCreateRelations, CourseUpdateRelations, CourseList } from "./validators"
import { CourseCreate, CourseUpdate } from "../../zod"
import { IdInput } from "../../middlewares"
import { generatePrereq } from "../utils/openai"

export const listCourses = async (req: Request<CourseList>, res: Response) => {
  const keywords = req.query.keywords as string | undefined
  const courses = await req.prisma.$queryRaw`
    select 
      id, code, subject_code, course_number, description,
      name, long_name, units, aka, career,
      is_active, is_multi_term, is_nogpa, is_repeatable
    from "catalog"."courses"
    where search_vector @@ plainto_tsquery('english', ${keywords})
  `
  return res.json(courses)
}

export const getCourse = async (req: Request<IdInput>, res: Response) => {
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
  req: Request<ParamsDictionary, any, CourseCreate & CourseCreateRelations>,
  res: Response,
) => {
  // find if there is a course with the same cid
  const existingCourse = await req.prisma.course.findFirst({
    where: { cid: req.body.cid },
  })
  if (existingCourse) {
    return res.status(403).json({ error: "Course with the given cid already exists" })
  }

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
    },
  })
  return res.json(course)
}

export const updateCourse = async (
  req: Request<ParamsDictionary, any, CourseUpdate & CourseUpdateRelations>,
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
          where: { number_course_id: { number: topic.number, course_id: req.params.id } },
          create: topic,
        })),
      },
    },
  })
  return res.json(course)
}

export const deleteCourse = async (req: Request<IdInput>, res: Response) => {
  const course = await req.prisma.course.delete({
    where: { id: req.params.id },
  })
  return res.json(course)
}

export const generateRequisites = async (req: Request<IdInput>, res: Response) => {
  const course = await req.prisma.course.findUnique({
    where: { id: req.params.id },
    include: {
      subject: true,
      departments: true,
      faculties: true,
      topics: true,
    },
  })

  if (!course) {
    return res.status(404).json(course)
  }

  const prereq = course.prereq
  if (!prereq) {
    return res.json(null)
  }

  const prereq_json = await generatePrereq(prereq, 3)
  return res.json(prereq_json)
}
