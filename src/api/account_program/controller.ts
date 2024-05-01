import { AccountProgram } from './models';
import { CatalogProgramModel } from '../programs/models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JwtPayload, jwtDecode } from "jwt-decode";
import User from './../account/interfaces'
import { Accounts } from '../account/models';
interface JwtContent{
  payload:User,
  exp:number,
  iat:number
}

export const getAccountPrograms = async (req: Request, res: Response) => {

  try{
    const { token } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const id = decoded.payload.id;

    const programs = await AccountProgram.find({account_id:decoded});

    const programIds = programs.map(x => x.program_id );

    const ProgramList = CatalogProgramModel.find({ '_id': { $in: programIds } })

    return res.status(200).json(ProgramList);
  } catch(error){
    return res.status(400).json({"error":"Something went wrong."});
  }


};



export const AddAccountPrograms = async (req: Request, res: Response) => {
  try{
    const { token,program_id } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const id = decoded.payload.id;

    const checkAccount = await Accounts.findById({id});
    if (!checkAccount){
      return res.status(400).json({"error":"Account does not exist."});
    }

    const checkProgram= await CatalogProgramModel.findById({program_id});
    if (!checkProgram){
      return res.status(400).json({"error":"Course does not exist."});
    }

    const checkConnect = await AccountProgram.find( {account_id: id, program_id: program_id} )
    if (checkConnect){
      return res.status(400).json({"error":"You are in the program already."});
    }

    const user = await AccountProgram.create({account_id: id, program_id: program_id})

    return res.status(200).json(user);
  } catch(error){
    return res.status(400).json({"error":"Something went wrong."});
  }

};
