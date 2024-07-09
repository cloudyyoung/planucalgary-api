import { Response } from "express"

import { CatalogProgram } from "../../models"
import { AuthenticatedRequest } from "../../interfaces"

import { ProgramEnrolledError, ProgramNotExistsError } from "./errors"

export const getAccountPrograms = async (req: AuthenticatedRequest, res: Response) => {
  const account = req.account!
  const programIds = account.programs
  const programs = await CatalogProgram.find({ coursedog_id: { $in: programIds } })
  return res.status(200).json({ programs })
}

export const addAccountPrograms = async (req: AuthenticatedRequest, res: Response) => {
  const { program_id: program_coursedog_id } = req.body
  const program = await CatalogProgram.findOne({ coursedog_id: program_coursedog_id })
  if (!program) {
    throw new ProgramNotExistsError()
  }

  const account = req.account!
  if (account.programs.some((x) => x === program_coursedog_id.toString())) {
    throw new ProgramEnrolledError()
  }

  account.programs.push(program_coursedog_id)
  account.save()
  return res.status(200).json()
}
