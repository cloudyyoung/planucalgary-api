import { Request, Response } from 'express';

import { CatalogProgram } from './models';

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
    // Project the fields you want to include in the final output
    {
      $project: {
        cid: '$coursedog_id',
        // program_group_id: '$program_group_id',
        code: '$code',
        degree_designation_code: '$degree_designation_code',
        degree_designation_name: '$degree_designation_name',
        // name: '$name',
        // long_name: '$long_name',
        type: '$type',
        display_name: {
          $cond: { if: { $eq: ['$type', 'ACP'] }, then: '$display_name', else: '$transcript_description' }
        },
        career: '$career',
        departments: '$department_details.name',
      }
    },
  ]);


  return res.status(200).json(programs);
};


export const getProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  const program = await CatalogProgram.findOne({ coursedog_id: id }).exec();

  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }

  return res.status(200).json(program);
}