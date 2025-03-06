import { Request, Response } from "express"

import { Prisma } from "@prisma/client"
import { RequisiteList, RequisitesSync, RequisiteUpdate } from "./validators"
import { IdInput } from "../../middlewares"
import { generatePrereq } from "../utils/openai"
import { cleanup, isJsonEqual } from "../../jsonlogic/utils"
import { getValidator } from "../../jsonlogic/requisite_json"
import { toCourses, toRequisitesJson } from "./sync"

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
    const { valid, errors, warnings } = validate(requisite.json)
    return {
      ...requisite,
      json_valid: valid,
      json_errors: errors,
      json_warnings: warnings,
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

  if (req.body.json !== null) {
    const validate = await getValidator()
    const json = req.body.json
    const { valid, errors, warnings } = validate(json)

    if (!valid) {
      return res.status(400).json({ message: "Invalid JSON", errors, warnings })
    }
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
  const existing = await req.prisma.requisiteJson.findUnique({
    where: { id: req.params.id },
  })

  if (!existing) {
    return res.status(404).json({ message: "Requisite not found" })
  }

  const text = existing.text
  const type = existing.requisite_type
  const department = existing.departments[0] ?? "None"
  const faculty = existing.faculties[0] ?? "None"
  const choices = await generatePrereq(text, type, department, faculty, 3)
  const json_parsed = JSON.parse(JSON.stringify(choices))
  const json_cleaned = json_parsed.map(cleanup)
  const json_choices = json_cleaned

  // Deeply compare all choices if they are the same, if so, automatically select the first choice
  const allEqual = json_choices.every((choice: JSON) => isJsonEqual(choice, json_choices[0]))

  const updated = await req.prisma.requisiteJson.update({
    where: { id: req.params.id },
    data: { json_choices, json: allEqual ? json_choices[0] : existing.json },
  })
  return res.json(updated)
}

export const syncRequisites = async (req: Request<RequisitesSync>, res: Response) => {
  const destination = req.body.destination

  if (destination === "requisites_jsons") {
    toRequisitesJson(req, res)
  } else if (destination === "courses") {
    toCourses(req, res)
  }
}
