import { Express } from 'express';
import mongooseLoader from './mongoose';
import expressLoader from './express';

export default async (app: Express) => {
  await mongooseLoader();
  expressLoader(app);
}