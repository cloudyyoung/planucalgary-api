import { Request, Response } from "express"
import { RequisiteType, Prisma } from "@prisma/client"
import { RequisiteJsonCreate } from "../../zod"
import { getValidator } from "../../jsonlogic/requisite_json"

export const toRequisitesJson = async (req: Request, res: Response) => {
  const [courses, courseSets] = await Promise.all([
    req.prisma.course.findMany({
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
      where: {
        is_active: true,
      },
    }),
    req.prisma.courseSet.findMany(),
  ])

  const courses_requisites_jsons = courses.flatMap((course) => {
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
        json: Prisma.DbNull,
        json_choices: [],
      })
    }
    if (coreq) {
      requisites_jsons.push({
        requisite_type: RequisiteType.COREQ,
        text: coreq,
        departments: department_codes,
        faculties: faculty_codes,
        json: Prisma.DbNull,
        json_choices: [],
      })
    }
    if (antireq) {
      requisites_jsons.push({
        requisite_type: RequisiteType.ANTIREQ,
        text: antireq,
        departments: department_codes,
        faculties: faculty_codes,
        json: Prisma.DbNull,
        json_choices: [],
      })
    }
    return requisites_jsons
  })

  const course_sets_requisites_json = courseSets.flatMap((courseSet) => {
    const { name } = courseSet
    return {
      requisite_type: RequisiteType.COURSE_SET,
      text: name,
      departments: [],
      faculties: [],
      json: Prisma.DbNull,
      json_choices: [],
    }
  })

  const requisites_jsons = [...courses_requisites_jsons, ...course_sets_requisites_json]

  const result = await req.prisma.requisiteJson.createMany({
    data: requisites_jsons,
    skipDuplicates: true,
  })

  const count = result.count

  return res.status(200).json({
    message: `${count} requisites are added to requisites_jsons.`,
    courses_requisites: courses_requisites_jsons.length,
    course_sets_requisites: course_sets_requisites_json.length,
    new_requisites: count,
  })
}

export const toCourses = async (req: Request, res: Response) => {
  const validate = await getValidator()

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
    where: {
      is_active: true,
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
          requisite_type_text_departments_faculties: {
            requisite_type: RequisiteType.PREREQ,
            text: prereq,
            departments: department_codes,
            faculties: faculty_codes,
          },
        },
      })

      if (prereq_json_row) {
        if (validate(prereq_json_row.json)) {
          prereq_json = prereq_json_row.json ?? Prisma.DbNull
        } else {
          prereq_json = Prisma.DbNull
        }
      }
    }

    if (coreq) {
      const coreq_json_row = await req.prisma.requisiteJson.findUnique({
        where: {
          requisite_type_text_departments_faculties: {
            requisite_type: RequisiteType.COREQ,
            text: coreq,
            departments: department_codes,
            faculties: faculty_codes,
          },
        },
      })

      if (coreq_json_row) {
        if (validate(coreq_json_row.json)) {
          coreq_json = coreq_json_row.json ?? Prisma.DbNull
        } else {
          coreq_json = Prisma.DbNull
        }
      }
    }

    if (antireq) {
      const antireq_json_row = await req.prisma.requisiteJson.findUnique({
        where: {
          requisite_type_text_departments_faculties: {
            requisite_type: RequisiteType.ANTIREQ,
            text: antireq,
            departments: department_codes,
            faculties: faculty_codes,
          },
        },
      })

      if (antireq_json_row) {
        if (validate(antireq_json)) {
          antireq_json = antireq_json_row.json ?? Prisma.DbNull
        } else {
          antireq_json = Prisma.DbNull
        }
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
