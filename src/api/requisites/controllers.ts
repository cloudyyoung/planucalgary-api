import { Request, Response } from "express"

import { RequisiteJsonCreate } from "../../zod"
import { Prisma, RequisiteType } from "@prisma/client"
import { RequisiteList, RequisitesSync, RequisiteUpdate } from "./validators"
import { IdInput } from "../../middlewares"
import { generatePrereq } from "../utils/openai"
import { cleanup, isJsonEqual } from "../../jsonlogic/utils"
import { getValidator } from "../../jsonlogic/requisite_json"

export const listRequisites = async (req: Request<any, any, any, RequisiteList>, res: Response) => {
  const { type } = req.query
  const [requisites, total, validate] = await Promise.all([
    req.prisma.requisiteJson.findMany({
      select: {
        id: true,
        requisite_type: true,
        text: true,
        departments: true,
        faculties: true,
        program: true,
        json: true,
        json_choices: true,
      },
      where: {
        ...(type && { requisite_type: type }),
      },
      orderBy: {
        text: "asc",
      },
      skip: req.pagination.offset,
      take: req.pagination.limit,
    }),
    req.prisma.requisiteJson.count({
      where: {
        ...(type && { requisite_type: type }),
      },
    }),
    getValidator(),
  ])

  const requisitesValidated = requisites.map((requisite) => {
    const { valid, errors } = validate(requisite.json)
    return {
      ...requisite,
      json_valid: valid,
      json_errors: errors,
    }
  })

  return res.paginate(requisitesValidated, total)
}

export const getRequisite = async (req: Request<IdInput>, res: Response) => {
  const requisite = await req.prisma.requisiteJson.findUnique({
    where: { id: req.params.id },
  })

  if (!requisite) {
    return res.status(404).json({ message: "Requisite not found" })
  }

  return res.json(requisite)
}

export const updateRequisite = async (req: Request<IdInput, any, RequisiteUpdate>, res: Response) => {
  const existing = await req.prisma.requisiteJson.findUnique({
    where: { id: req.params.id },
  })

  if (!existing) {
    return res.status(404).json({ message: "Requisite not found" })
  }

  const validate = await getValidator()
  const json = req.body.json
  const { valid, errors } = validate(json, { strict: false })

  if (!valid) {
    return res.status(400).json({ message: "Invalid JSON", errors: errors })
  }

  const requisite = await req.prisma.requisiteJson.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
      ...(req.body.json && { json: req.body.json ?? Prisma.DbNull }),
    },
  })
  return res.json(requisite)
}

export const generateRequisiteChoices = async (req: Request<IdInput>, res: Response) => {
  const requisite = await req.prisma.requisiteJson.findUnique({
    where: { id: req.params.id },
  })

  if (!requisite) {
    return res.status(404).json({ message: "Requisite not found" })
  }

  const text = requisite.text
  const department = requisite.departments[0] ?? "None"
  const faculty = requisite.faculties[0] ?? "None"
  const choices = await generatePrereq(text, department, faculty, 3)
  const json_parsed = JSON.parse(JSON.stringify(choices))
  const json_cleaned = json_parsed.map(cleanup)
  const json_choices = json_cleaned

  // Deeply compare all choices if they are the same, if so, automatically select the first choice
  const allEqual = json_choices.every((choice: JSON) => isJsonEqual(choice, json_choices[0]))

  const updated = await req.prisma.requisiteJson.update({
    where: { id: req.params.id },
    data: { json_choices, json: allEqual ? json_choices[0] : Prisma.DbNull },
  })
  return res.json(updated)
}

export const syncRequisites = async (req: Request<RequisitesSync>, res: Response) => {
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
