import { Request, Response } from "express"
import { Request as JWTRequest } from "express-jwt"
import { jwtDecode } from "jwt-decode"

import { Account, CatalogProgram } from "../../models"
import { JwtContent } from "../accounts/interfaces"

export const getAccountPrograms = async (req: JWTRequest, res: Response) => {
  const auth = req.auth! as JwtContent
  const account = await Account.findOne({ _id: auth.id })

  if (!account) {
    throw new Error("Account not found.")
  }

  const programIds = account.programs
  const programs = await CatalogProgram.find({ _id: { $in: programIds } })
  return res.status(200).json({ programs: programs })
}

export const AddAccountPrograms = async (req: Request, res: Response) => {
  try {
    const { token, program_id } = req.body
    const decoded = jwtDecode<JwtContent>(token)
    const account_id = decoded.id
    console.log(account_id, program_id, decoded)

    const checkAccount = await Account.findById({ _id: account_id })
    if (!checkAccount) {
      return res.status(400).json({ error: "Account does not exist." })
    }

    const checkProgram = await CatalogProgram.findById({ _id: program_id })
    if (!checkProgram) {
      return res.status(400).json({ error: "Course does not exist." })
    }

    if (checkAccount.programs.some((x) => x === program_id.toString())) {
      return res.status(400).json({ error: "You are in the program already." })
    }

    checkAccount.programs.push(program_id)

    Account.updateOne(
      { _id: account_id },
      { $set: { programs: checkAccount.programs } },
      (err: unknown, doc: unknown) => {
        if (err) {
          console.log(err)
        }
        console.log(doc)
      },
    )

    return res.status(200).json({ message: "You successfully added the program." })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Something went wrong." })
  }
}
