import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { router as programsRouter } from '../api/programs/routes';
import { router as userRouter} from '../api/account/routes';
import { router as accountProgramRouter} from '../api/account_program/routes';

export default (app: Express) => {
  process.on('uncaughtException', async (error) => {
    console.log(error);
  });

  process.on('unhandledRejection', async (ex) => {
    console.log(ex);
  });

  app.enable('trust proxy');
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(compression());
  app.disable('x-powered-by');
  app.disable('etag');

  app.use('/programs', programsRouter);
  app.use('/account', userRouter);
  app.use('/accountPrograms', accountProgramRouter);


  app.get('/', (_req, res) => {
    return res.status(200).json({ message: "ok" }).end();
  });
}