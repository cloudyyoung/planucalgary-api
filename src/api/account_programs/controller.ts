import { AccountProgram } from './models';
import { CatalogProgramModel } from '../catalog_programs/models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JwtPayload, jwtDecode } from "jwt-decode";
import User from '../accounts/interfaces'
import { Accounts } from '../accounts/models';
interface JwtContent {
  payload: content,
  exp: number,
  iat: number
}

interface content {
  user: User
}
export const getAccountPrograms = async (req: Request, res: Response) => {

  try {
    const { token } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const id = decoded.payload.user.id;
    console.log(id)
    const user = await Accounts.findOne({ "_id": id });
    if (user){
      const programIds = user.programs;
      const ProgramList = await CatalogProgramModel.find({ '_id': { $in: programIds } })
      console.log(ProgramList)      
      return res.status(200).json({ "Programs": ProgramList });
    } else {
      return res.status(400).json({ "error": "Cannot find the user." });
    }

    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ "error": "Something went wrong." });
  }


};



export const AddAccountPrograms = async (req: Request, res: Response) => {
  try {
    const { token, program_id } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const account_id = decoded.payload.user.id;
    console.log(account_id, program_id, decoded)

    const checkAccount = await Accounts.findById({ "_id": account_id });
    if (!checkAccount) {
      return res.status(400).json({ "error": "Account does not exist." });
    }

    const checkProgram = await CatalogProgramModel.findById({ "_id": program_id });
    if (!checkProgram) {
      return res.status(400).json({ "error": "Course does not exist." });
    }

    /*
    const checkConnect = await AccountProgram.findOne({ account_id: account_id, program_id: program_id })
    if (checkConnect) {
      return res.status(400).json({ "error": "You are in the program already." });
    }

    const user = await AccountProgram.create({ account_id, program_id })*/

    if (checkAccount.programs.some(x => x === program_id.toString())){
      return res.status(400).json({ "error": "You are in the program already." });
    }

    checkAccount.programs.push(program_id);
    //const updatedPrograms = Array.from(new Set(checkAccount.programs))
    console.log(checkAccount.programs)
    Accounts.updateOne({"_id": account_id},{$set:{programs:checkAccount.programs}}, (err: any,doc: any)=>{
      if (err){
        console.log(err)
      }
      console.log(doc)
    })

    return res.status(200).json({ "message": "You successfully added the program." });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ "error": "Something went wrong." });
  }

};
