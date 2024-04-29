import express from 'express'
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

export default (app) => {
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
  app.use(express.static('public'));
  app.disable('x-powered-by');
  app.disable('etag');

  app.get('/', (_req, res) => {
    return res.status(200).json({ message: "ok" }).end();
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
      return res.status(200).json({});
    }
    next();
  });

  app.use((_req, _res, next) => {
    const error = new Error('Endpoint could not find!');
    error.status = 404;
    next(error);
  });
}