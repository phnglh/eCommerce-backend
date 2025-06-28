import express, { Application, Request, Response } from 'express';
import morganMiddleware from './middleware/morgan-middleware';
import cors from 'cors';
import config from './config';
import routes from './routes';
import errorHandler from 'errorhandler';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import './config/database';
const app: Application = express();

// middleware
app
  .use(morganMiddleware)
  .use(
    compression({
      threshold: 100 * 100,
      level: 6,
    }),
  )
  .use(cookieParser())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(
    cors({
      origin:
        'http://localhost:8000,http://localhost:3333,http://localhost:3000',
      methods: ['GET,POST,PATCH,DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use(helmet());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ ok: true, environment: config.env });
});

app.use(config.api.prefix, routes());


app.use(errorHandler());


export default app;
