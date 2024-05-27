import { Request, Response } from "express"
import { CatalogCourse } from "./model"
import { jwtDecode } from "jwt-decode"
import JwtContent from "../account_courses/interfaces"
import { Accounts } from "../accounts/models"
export const Courses = async (req: Request, res: Response) => {
  try {
    const allCourses = await CatalogCourse.find({}).limit(10)
    return res.status(200).json({ message: allCourses })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Something went wrong." })
  }
}

export const checkPrereq = async (req: Request, res: Response) => {
  const { token, course_id } = req.body
  const decoded = jwtDecode<JwtContent>(token)
  const account_id = decoded.payload.user.id
  if (!token || !course_id) {
    return res.status(400).json({ error: "Missing attributes." })
  }

  const checkAccount = await Accounts.findById({ _id: account_id })
  if (!checkAccount) {
    return res.status(400).json({ error: "Account does not exist." })
  }

  const checkCourse = await CatalogCourse.findOne({ coursedog_id: course_id })
  if (!checkCourse) {
    return res.status(400).json({ error: "Course does not exist." })
  }

  //const checkPrereq = processPrereq(checkCourse.prereq ?? "")
  return res.status(200).json({ status: checkPrereq })
}
// open main.py under bianco,
// Run the script. It will create course anti/pre/co-req.
// Process the prereq json logic


const processPrereq = (prereq, courseList, programList) => {
  let checkList: any[] = []
  const checkResults : boolean[]= []
  // Loop through each key in the object
  if ("and" in prereq){
      checkList = prereq["and"]
  } else {
      checkList = prereq["or"]
  }
  
  for (const item of checkList)
  {
      //{'course': 'ENSF300'}
      if ('course' in item){
          const course = item['course']
          if (course in courseList){
              checkResults.push(true)
          } else {
              checkResults.push(false)
          }
          
      // {"units": {"required": 3, "from": [{"course": "GEOG211"}, {"course": "GEOG308"}, {"course": "GEOG310"}]}}
      } else if ('units' in item && 'from' in item.units && Array.isArray(item.units.from)){
        // Initialize an empty list to store the courses
        const courses : string[] = [];
        
        // Access the 'from' array
        const fromArray = item.units.from;
        
        // Loop through the 'from' array and extract the 'course' values
        fromArray.forEach(item => {
          if (item.course) {
            courses.push(item.course);
          }
        });
        
        // Access the 'required' attribute
        const required = parseInt(item.units.required) / 3;
        
        // Check how many of these courses the user completed
        let completed = 0
        for (const c in courses){
            if (c in courseList){
                completed += 1
            }
        }
        
        // If completed more than or equals then we pass
        if (completed >= required){
              checkResults.push(true)
          } else {
              checkResults.push(false)
          }
      // {"units": {"required": 15, "from": {"subject_code": "ART"}}}
      } else if ('units' in item && 'from' in item.units && item.units.from != null){
          const required = parseInt(item.units.required) / 3;
          const subjectCode = item.units.from.subject_code
          const takenList = courseList.filter(x => x.startsWith('subjectCode'))
          
          if (takenList.length >= required){
              checkResults.push(true)
          } else {
              checkResults.push(false)
          }
      // {"units": {"required": 54}}
      } else if ('units' in item && 'from' in item.units && item.units.from == null) {
          const required = parseInt(item.units.required) / 3;
          if (courseList.length >= required){
              checkResults.push(true)
          } else {
              checkResults.push(false)
          }
      }
      // {"admission": "Honours in Visual Studies"}
      else if ('admission' in item){
          const program = item['admission']
          if (program in programList){
              checkResults.push(true)
          } else {
              checkResults.push(false)
          }
          // {"consent": "the Department"}
      } else if ('consent' in item){
          checkResults.push(true)
          
          //{"courses": {"required": 1, "from": [{"course": "BMEN319"}, {"course": "ENGG319"}, {"course": "ENEL419"}]}}
      } else if (false) {
          
      }
  }
  console.log(checkResults, ("and" in prereq))
  
  if ("and" in prereq){
      if (checkResults.includes(false)){
          return false
      } else {
          return true
      }
  } else {
      if (checkResults.includes(true)){
          return true
      }
  }
  return false
}