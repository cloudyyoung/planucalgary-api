import { CatalogCourse } from '../catalog_courses/model';
import { Request, Response } from 'express';
import { JwtPayload, jwtDecode } from "jwt-decode";
import JwtContent from './interfaces'
import { Accounts } from '../accounts/models';

interface CourseId {
  id:string;
  term: {};
}

export const getAccountCourses = async (req: Request, res: Response) => {

  try {
    const { token } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const id = decoded.payload.user.id;
    console.log(id)
    const user = await Accounts.findOne({ "_id": id });
    if (user){
      const courseIds : CourseId[] = user.courses.map(x => x.id);
      const courseList = await CatalogCourse.find({ '_id': { $in: courseIds } })
      console.log(courseList)      
      return res.status(200).json({ "CourseList": courseList });
    } else {
      return res.status(400).json({ "error": "Cannot find the user." });
    }

    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ "error": "Something went wrong." });
  }


};



export const AddAccountCourses = async (req: Request, res: Response) => {
  try {
    const { token, course_id, term } = req.body;
    const decoded = jwtDecode<JwtContent>(token);
    const account_id = decoded.payload.user.id;
    console.log(token ,course_id ,term)
    if (!token || !course_id || !term){
      return res.status(400).json({ "error": "Missing attributes." });
    }

    const checkAccount = await Accounts.findById({ "_id": account_id });
    if (!checkAccount) {
      return res.status(400).json({ "error": "Account does not exist." });
    }

    const checkCourse = await CatalogCourse.findById({ "id": course_id });
    if (!checkCourse) {
      return res.status(400).json({ "error": "Course does not exist." });
    }

    if (checkAccount.courses.some(x => x.id === course_id.toString())){
      return res.status(400).json({ "error": "You are in the program already." });
    }

    const newObj: CourseId = {
      id:course_id,
      term:term
  };

    checkAccount.courses.push(newObj);

    Accounts.updateOne({"_id": account_id},{$set:{courses:checkAccount.courses}}, (err: any,doc: any)=>{
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