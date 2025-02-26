import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { CourseCreateRelations, CourseUpdateRelations, CourseList, SyncRequisites } from "./validators"
import { CourseCreate, CourseUpdate, RequisiteJsonCreate } from "../../zod"
import { IdInput } from "../../middlewares"
import { generatePrereq } from "../utils/openai"
import { Course, Prisma, RequisiteType } from "@prisma/client"

export const listCourses = async (req: Request<any, any, any, CourseList>, res: Response) => {
  const keywords = req.query.keywords
  const offset = req.pagination.offset
  const limit = req.pagination.limit
  const is_admin = req.account?.is_admin === true

  const getSelectStatement = () => {
    const fields = [
      "id",
      "code",
      "subject_code",
      "course_number",
      "description",
      "name",
      "long_name",
      "units",
      "aka",
      "career",
      "is_active",
      "is_multi_term",
      "is_nogpa",
      "is_repeatable",
    ]

    if (is_admin) {
      fields.push("prereq")
      fields.push("coreq")
      fields.push("antireq")
      fields.push("prereq_json")
      fields.push("coreq_json")
      fields.push("antireq_json")
    }

    return Prisma.sql`select ${Prisma.join(
      fields.map((field) => Prisma.sql`${Prisma.raw(field)}`),
      ", ",
    )} from "catalog"."courses"`
  }

  const getWhereStatement = () => {
    const whereSegments = []
    if (keywords) {
      whereSegments.push(Prisma.sql`search_vector @@ plainto_tsquery('english', ${keywords})`)
    }

    if (whereSegments.length === 0) {
      return Prisma.empty
    }
    return Prisma.sql`where ${Prisma.join(whereSegments, " and ")}`
  }

  const selectStatement = getSelectStatement()
  const whereStatement = getWhereStatement()

  const queryString = Prisma.sql`
      ${selectStatement}
      ${whereStatement}
      offset ${offset}
      limit ${limit}
    `
  const totalQueryString = Prisma.sql`select count(*)::int from "catalog"."courses" ${whereStatement}`

  const [courses, totalResult] = await Promise.all([
    await req.prisma.$queryRaw<Course[]>(queryString),
    await req.prisma.$queryRaw<[{ count: number }]>(totalQueryString),
  ])
  const total = totalResult[0].count

  return res.paginate(courses, total)
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
  const existing = await req.prisma.course.findFirst({
    where: { cid: req.body.cid },
  })
  if (existing) {
    return res.status(403).json({ error: "Course with the given cid already exists", existing })
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

export const syncRequisites = async (req: Request<SyncRequisites>, res: Response) => {
  const destination = req.body.destination

  if (destination === "requisites_jsons") {
    const courses = await req.prisma.course.findMany({
      select: {
        prereq: true,
        coreq: true,
        antireq: true,
        departments: {
          select: {
            code: true,
          },
        },
        faculties: {
          select: {
            code: true,
          },
        },
      },
    })

    const requisites_jsons = courses.flatMap((course) => {
      const { prereq, coreq, antireq, departments, faculties } = course
      const department_codes = departments.map((d) => d.code)
      const faculty_codes = faculties.map((f) => f.code)

      const requisites_jsons: RequisiteJsonCreate[] = []

      if (prereq) {
        requisites_jsons.push({
          requisite_type: RequisiteType.PREREQ,
          text: prereq,
          departments: department_codes,
          faculties: faculty_codes,
          program: "",
          json: Prisma.JsonNull,
          json_choices: [],
        })
      }
      if (coreq) {
        requisites_jsons.push({
          requisite_type: RequisiteType.COREQ,
          text: coreq,
          departments: department_codes,
          faculties: faculty_codes,
          program: "",
          json: Prisma.JsonNull,
          json_choices: [],
        })
      }
      if (antireq) {
        requisites_jsons.push({
          requisite_type: RequisiteType.ANTIREQ,
          text: antireq,
          departments: department_codes,
          faculties: faculty_codes,
          program: "",
          json: Prisma.JsonNull,
          json_choices: [],
        })
      }
      return requisites_jsons
    })

    await req.prisma.requisiteJson.createMany({
      data: requisites_jsons,
      skipDuplicates: true,
    })

    return res.status(200).json({ message: `${requisites_jsons.length} requisites are synced to requisites_jsons.` })
  } else if (destination === "courses") {
    const courses = await req.prisma.course.findMany({
      select: {
        id: true,
        prereq: true,
        coreq: true,
        antireq: true,
        departments: {
          select: {
            code: true,
          },
        },
        faculties: {
          select: {
            code: true,
          },
        },
      },
    })

    for (const course of courses) {
      const { id, prereq, coreq, antireq, departments, faculties } = course
      const department_codes = departments.map((d) => d.code)
      const faculty_codes = faculties.map((f) => f.code)

      let prereq_json
      let coreq_json
      let antireq_json

      if (prereq) {
        const prereq_json_row = await req.prisma.requisiteJson.findUnique({
          where: {
            requisite_type_text_departments_faculties_program: {
              requisite_type: RequisiteType.PREREQ,
              text: prereq,
              departments: department_codes,
              faculties: faculty_codes,
              program: "",
            },
          },
        })

        if (prereq_json_row) {
          prereq_json = prereq_json_row.json ?? Prisma.JsonNull
        }
      }

      if (coreq) {
        const coreq_json_row = await req.prisma.requisiteJson.findUnique({
          where: {
            requisite_type_text_departments_faculties_program: {
              requisite_type: RequisiteType.COREQ,
              text: coreq,
              departments: department_codes,
              faculties: faculty_codes,
              program: "",
            },
          },
        })

        if (coreq_json_row) {
          coreq_json = coreq_json_row.json ?? Prisma.JsonNull
        }
      }

      if (antireq) {
        const antireq_json_row = await req.prisma.requisiteJson.findUnique({
          where: {
            requisite_type_text_departments_faculties_program: {
              requisite_type: RequisiteType.ANTIREQ,
              text: antireq,
              departments: department_codes,
              faculties: faculty_codes,
              program: "",
            },
          },
        })

        if (antireq_json_row) {
          antireq_json = antireq_json_row.json ?? Prisma.JsonNull
        }
      }

      await req.prisma.course.update({
        where: { id },
        data: {
          prereq_json,
          coreq_json,
          antireq_json,
        },
      })
    }

    return res.status(200).json({ message: `${courses.length} requisites are synced to courses.` })
  }
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
