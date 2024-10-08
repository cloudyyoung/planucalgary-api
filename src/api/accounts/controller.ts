import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Account } from "../../models"
import { JWT_SECRET_KEY } from "../../config"
import { JwtContent } from "../../interfaces"

import { EmailExistsError, InvalidCredentialsError, UsernameExistsError } from "./errors"

function generateAccessToken(payload: JwtContent, key: string): string {
  return jwt.sign(payload, key, { expiresIn: "36000s", algorithm: "HS256", issuer: "plan-ucalgary-api" })
}

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  //Check for the same username
  const usernameCheck = await Account.findOne({ username })
  if (usernameCheck) {
    throw new UsernameExistsError()
  }

  //check for the same email
  const emailCheck = await Account.findOne({ email })
  if (emailCheck) {
    throw new EmailExistsError()
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await Account.create({
    email,
    username,
    password: passwordHash,
    programs: [],
    courses: [],
  })

  const payload: JwtContent = {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  }

  const token = generateAccessToken(payload, JWT_SECRET_KEY!)
  return res.status(200).json({ token })
}

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body

  //Check for similar username
  const authAccount = await Account.findOne({ username })
  if (!authAccount) {
    throw new InvalidCredentialsError()
  }

  //Compare the password
  const match = await bcrypt.compare(password, authAccount.password)
  if (!match) {
    throw new InvalidCredentialsError()
  }

  const payload: JwtContent = {
    id: authAccount._id.toString(),
    email: authAccount.email,
    username: authAccount.username,
  }

  const token = generateAccessToken(payload, JWT_SECRET_KEY!)

  return res.status(200).json({ token })
}
