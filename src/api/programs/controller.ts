import { Request, Response } from 'express';

import { CatalogProgram } from './models';

export const getPrograms = async (req: Request, res: Response) => {
  const programs = await CatalogProgram.find().catch(err => {
    return res.status(500).json({});
  });

  return res.status(200).json(programs);
};