import { Request, Response } from "express"

import { CatalogProgram } from "../../models"

export const getPrograms = async (req: Request, res: Response) => {
  const programDocuments = await CatalogProgram.aggregate([
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
  const programDocument = await CatalogProgram.findOne({ coursedog_id: id })

  if (!programDocument) {
    return res.status(404).json({ message: "Program not found" })
  }

  return res.status(200).json(programDocument)
}
