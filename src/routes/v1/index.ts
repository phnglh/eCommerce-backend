import { Request, Response, Router } from 'express';
import config from '../../config';
import auth from './auth';

export default (): Router => {
  const app = Router();

  auth(app);
  
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ ok: true, environment: config.env });
  });
  
  return app;
};
