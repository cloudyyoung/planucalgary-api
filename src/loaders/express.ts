import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { router } from '../api/programs/routes';

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

  app.use('/programs', router);

  app.get('/', (_req, res) => {
    return res.status(200).json({ message: "ok" }).end();
  });
}