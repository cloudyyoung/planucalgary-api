import { Request, Response } from 'express';

import { Accounts } from './models';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface User {
  email: string;
  username: string;
}


function generateAccessToken(user : User, key : string) : string{
  return jwt.sign({payload:{user}}, key, { expiresIn: '3600s' });
}

export const signup = async (req: Request, res: Response) => {
  try{
    console.log(req.body)
    const {username, email, password} = req.body;

    //Check for missing attributes
    if ( !username || !email || !password){
      return res.json({"message":"Missing Attributes.", status:false});
    }

    //Check for the same username
    const usernameCheck = await Accounts.findOne({username});
    if (usernameCheck){
      return res.json({"message":"Username already exists.", status:false});
    }

    //check for the same email
    const emailCheck = await Accounts.findOne({email});
    if (emailCheck){
      return res.json({"message":"Email already exists.", status:false});
    }

    if (username.length < 4 || password.length < 4) {
      return res.json({"message":"Username and password must have at least 5 characters.", status:false});
    }

    const passwordHash = await bcrypt.hash(password,10)

    const user = await Accounts.create({
      email,
      username,
      password: passwordHash
    })

    
    const userInfo: User = {
      email: user.email,
      username: user.username
    };

    //Return login token and user info
    const secretKey = process.env.JWT_SECRET_KEY ?? ""
    const token = generateAccessToken(userInfo, secretKey)
    return res.json({status:true, token, userInfo})    
  } catch(error){
    console.log(error)
    return res.json({status:false})   
  }

};


export const signin = async (req: Request, res: Response) => {

  try{
    const {username, password} = req.body;

    //Check for similar username
    const loginUser = await Accounts.findOne({username});
    if (!loginUser){
      return res.json({"message":"Incorrect Username or Password", status:false});
    }

    //Compare the password
    bcrypt.compare(password, loginUser.password, (error, result) =>{
      if (error){
        console.log(error)
        return res.json({"message":"Incorrect Username or Password", status:false});
      } else {
        //If password matches
        if (result){
          const userInfo: User = {
            email: loginUser.email,
            username: loginUser.username
          };

          const secretKey = process.env.JWT_SECRET_KEY ?? ""
          const token = generateAccessToken(userInfo, secretKey)  

          return res.json({status:true, userInfo, token})    

          //If password does not match
        } else {
          return res.json({"message":"Incorrect Username or Password", status:false});
        }
      }
    })
  } catch(error){
    console.log(error)
    return res.json({status:false})   
  }

};
