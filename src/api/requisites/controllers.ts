import { Request, Response } from "express"

import { RequisiteJsonCreate } from "../../zod"
import { Prisma, RequisiteType } from "@prisma/client"
import { SyncRequisites } from "./validators"

export const listRequisites = async (req: Request<any, any, any, any>, res: Response) => {
  const [requisites, total] = await Promise.all([
    req.prisma.requisiteJson.findMany({
      select: {
        id: true,
        requisite_type: true,
        text: true,
        departments: true,
        faculties: true,
        program: true,
      },
      skip: req.pagination.offset,
      take: req.pagination.limit,
    }),
    req.prisma.requisiteJson.count(),
  ])
  return res.paginate(requisites, total)
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
