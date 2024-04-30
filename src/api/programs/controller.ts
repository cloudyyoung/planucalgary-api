import { Request, Response } from 'express';

import { CatalogProgram } from './models';
import { RequisitesEngine } from '../requisites/engine';

export const getPrograms = async (req: Request, res: Response) => {
  const programs = await CatalogProgram.aggregate([
    // Match programs that are active
    { $match: { active: true } },
    // Join with the Department collection
    {
      $lookup: {
        from: 'departments', // This should match the collection name of the Department model
        localField: 'departments', // The field in CatalogProgram that contains department codes
        foreignField: 'id', // The field in Department that matches codes
        as: 'department_details' // The result of the join will be stored in this field
      }
    },
    {
      $lookup: {
        from: 'faculties', // This should match the collection name of the Department model
        localField: 'departments', // The field in CatalogProgram that contains department codes
        foreignField: 'id', // The field in Department that matches codes
        as: 'faculty_details' // The result of the join will be stored in this field
      }
    },
    // Project the fields you want to include in the final output
    {
      $project: {
        cid: '$coursedog_id',
        code: '$code',
        degree_designation_code: '$degree_designation_code',
        degree_designation_name: '$degree_designation_name',
        type: '$type',
        display_name: {
          $cond: { if: { $eq: ['$type', 'ACP'] }, then: '$display_name', else: '$transcript_description' }
        },
        career: '$career',
        departments: '$department_details.display_name',
        faculties: '$faculty_details.display_name',
      }
    },
  ]);


  return res.status(200).json(programs);
};


export const getProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  const programs = await CatalogProgram.aggregate([
    // Match the specific program by coursedog_id
    { $match: id.match(/-\d{4}-\d{2}-\d{2}$/) ? { coursedog_id: id } : { code: id } },
    // Sort by cid descending
    { $sort: { cid: -1 } },
    // Join with the Department collection
    {
      $lookup: {
        from: 'departments', // This should match the collection name of the Department model
        localField: 'departments', // The field in CatalogProgram that contains department codes
        foreignField: 'id', // The field in Department that matches codes
        as: 'department_details' // The result of the join will be stored in this field
      }
    },
    {
      $lookup: {
        from: 'faculties', // This should match the collection name of the Department model
        localField: 'departments', // The field in CatalogProgram that contains department codes
        foreignField: 'id', // The field in Department that matches codes
        as: 'faculty_details' // The result of the join will be stored in this field
      }
    },
    // Add fields
    {
      $addFields: {
        display_name: {
          $cond: { if: { $eq: ['$type', 'ACP'] }, then: '$display_name', else: '$transcript_description' }
        },
        faculties: '$faculty_details.display_name',
        departments: '$department_details.display_name',
      }
    },
    // Limit the result to 1
    { $limit: 1 }
  ])

  if (!programs || programs.length < 1) {
    return res.status(404).json({ message: 'Program not found' });
  }

  const program = programs[0];

  // const { referencedCourseSets, referencedRequisiteSets } = getReferencedSets(program.requisites);
  // const courseSets = await CatalogCourseSet.aggregate([
  //   { $match: { id: { $in: referencedCourseSets } } },
  //   {
  //     $lookup: {
  //       from: 'courses',
  //       localField: 'course_list',
  //       foreignField: 'course_group_id',
  //       as: 'courses'
  //     }
  //   },
  // ]);

  // // Convert into a map for easier access
  // const courseSetMap = courseSets.reduce((acc, courseSet) => {
  //   acc[courseSet.id] = courseSet;
  //   return acc;
  // }, {});

  // program.requisites = aggregateRequisiteSets(program.requisites, courseSetMap);

  new RequisitesEngine(program.requisites, {});

  return res.status(200).json(program);
}