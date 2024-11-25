import { Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { JWT_SECRET_KEY } from "../../config"
import { JwtContent, PrismaRequest } from "../../interfaces"

import { EmailExistsError, InvalidCredentialsError } from "./errors"

function generateAccessToken(payload: JwtContent, key: string): string {
  return jwt.sign(payload, key, { expiresIn: "36000s", algorithm: "HS256", issuer: "plan-ucalgary-api" })
}

export const signup = async (req: PrismaRequest, res: Response) => {
  const { email, password } = req.body

  const emailCheck = await req.prisma.account.findFirst({
    where: {
      email,
    },
  })
  if (emailCheck) {
    throw new EmailExistsError()
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const account = await req.prisma.account.create({
    data: {
      email,
      password: passwordHash,
    },
  })

  const payload: JwtContent = {
    id: account.id,
    email: account.email,
  }

  const token = generateAccessToken(payload, JWT_SECRET_KEY!)
  return res.status(200).json({ token })
}

export const signin = async (req: PrismaRequest, res: Response) => {
  const { email, password } = req.body

  const account = await req.prisma.account.findFirst({
    where: {
      email,
    },
  })

  if (!account) {
    throw new InvalidCredentialsError()
  }

  const match = await bcrypt.compare(password, account.password)
  if (!match) {
    throw new InvalidCredentialsError()
  }

  const payload: JwtContent = {
    id: account.id,
    email: account.email,
  }

  const token = generateAccessToken(payload, JWT_SECRET_KEY!)

  return res.status(200).json({ token })
}
