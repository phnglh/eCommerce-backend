import express, { Application, Request, Response, NextFunction } from 'express';
import morganMiddleware from './middleware/morgan-middleware';
import cors from 'cors';
import config from './config';
import routes from './routes/v1';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import './config/database';
import { HttpError } from './utils/httpError';
// import errorHandler from "errorhandler"

const app: Application = express();

// Middleware setup
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
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET,POST,PATCH,DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use(helmet());

// Route prefix
app.use(`${config.api.prefix}/v1`, routes());

// Not found handler
app.use((req, res, next: NextFunction) => {
  next(new HttpError('Not Found', 404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = typeof err.status === 'number' ? err.status : 500;

   res.status(statusCode).json({
    code: statusCode,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});


// if (process.env.NODE_ENV === 'development') {
//   app.use(errorHandler()); 
// }


export default app;
