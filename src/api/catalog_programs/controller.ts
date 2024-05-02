import { Request, Response } from "express"

import { CatalogProgramModel } from "./models"
import { CatalogProgramDocument } from "./types"
import { convertProgramEnginedDocument } from "../../requisites/utils"

export const getPrograms = async (req: Request, res: Response) => {
  const programDocuments = await CatalogProgramModel.aggregate<CatalogProgramDocument>([
    // Match programs that are active
    { $match: { active: true } },
    // Join with the Department collection
    {
      $lookup: {
        from: "departments", // This should match the collection name of the Department model
        localField: "departments", // The field in CatalogProgram that contains department codes
        foreignField: "id", // The field in Department that matches codes
        as: "department_details", // The result of the join will be stored in this field
      },
    },
    {
      $lookup: {
        from: "faculties", // This should match the collection name of the Department model
        localField: "departments", // The field in CatalogProgram that contains department codes
        foreignField: "id", // The field in Department that matches codes
        as: "faculty_details", // The result of the join will be stored in this field
      },
    },
    // Project the fields you want to include in the final output
    {
      $project: {
        cid: "$coursedog_id",
        code: "$code",
        degree_designation_code: "$degree_designation_code",
        degree_designation_name: "$degree_designation_name",
        type: "$type",
        display_name: {
          $cond: { if: { $eq: ["$type", "ACP"] }, then: "$display_name", else: "$transcript_description" },
        },
        career: "$career",
        departments: "$department_details.display_name",
        faculties: "$faculty_details.display_name",
      },
    },
  ])
  return res.status(200).json(programDocuments)
}

export const getProgram = async (req: Request, res: Response) => {
  // Query the program by coursedog_id
  const { id } = req.params
  const programDocument = await CatalogProgramModel.findOne({ coursedog_id: id })

  if (!programDocument) {
    return res.status(404).json({ message: "Program not found" })
  }

  // Engine the document
  const programEnginedDocument = convertProgramEnginedDocument(programDocument.toJSON())
  await programEnginedDocument.requisites.hydrate()

  return res.status(200).json(programEnginedDocument)
}
