import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { router as programsRouter } from '../api/programs/routes';
import { router as userRouter} from '../api/user/routes';

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
  app.use('/user', userRouter);

  app.get('/', (_req, res) => {
    return res.status(200).json({ message: "ok" }).end();
  });
}