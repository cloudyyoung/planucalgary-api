import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Account } from "../../models"
import { JwtContent } from "./interfaces"

function generateAccessToken(payload: JwtContent, key: string): string {
  return jwt.sign(payload, key, { expiresIn: "3600s" })
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    //Check for missing attributes
    if (!username || !email || !password) {
      return res.json({ message: "Missing Attributes.", status: false })
    }

    //Check for the same username
    const usernameCheck = await Account.findOne({ username })
    if (usernameCheck) {
      return res.json({ message: "Username already exists.", status: false })
    }

    //check for the same email
    const emailCheck = await Account.findOne({ email })
    if (emailCheck) {
      return res.json({ message: "Email already exists.", status: false })
    }

    if (username.length < 4 || password.length < 4) {
      return res.json({ message: "Username and password must have at least 5 characters.", status: false })
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

    //Return login token and user info
    const secretKey = process.env.JWT_SECRET_KEY ?? ""
    const token = generateAccessToken(payload, secretKey)
    return res.json({ status: true, token, userInfo: payload })
  } catch (error) {
    return res.json({ status: false })
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    //Check for similar username
    const loginUser = await Account.findOne({ username })
    if (!loginUser) {
      return res.json({ message: "Incorrect Username or Password", status: false })
    }

    //Compare the password
    bcrypt.compare(password, loginUser.password, (error, result) => {
      if (error) {
        console.log(error)
        return res.json({ message: "Incorrect Username or Password", status: false })
      } else {
        //If password matches
        if (result) {
          const payload: JwtContent = {
            id: loginUser._id.toString(),
            email: loginUser.email,
            username: loginUser.username,
          }

          const secretKey = process.env.JWT_SECRET_KEY ?? ""
          const token = generateAccessToken(payload, secretKey)

          return res.json({ status: true, userInfo: payload, token })

          //If password does not match
        } else {
          return res.json({ message: "Incorrect Username or Password", status: false })
        }
      }
    })
  } catch (error) {
    console.log(error)
    return res.json({ status: false })
  }
}
