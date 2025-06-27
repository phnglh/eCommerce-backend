import express, { Application, Request, Response } from 'express';
import morganMiddleware from './middleware/morgan-middleware';
import cors from "cors"
import config from './config';
import routes from './routes';

const app: Application = express();

  app
    .disable("x-powered-by")
    .use(morganMiddleware)
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.use(config.api.prefix, routes());
export default app;
