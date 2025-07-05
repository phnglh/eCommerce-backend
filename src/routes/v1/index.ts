import { Request, Response, Router } from 'express';
import config from '../../config';
import auth from './auth';
import { apiKey, permissions } from '../../utils/auth/checkAuth';

export default (): Router => {
  const app = Router();

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ ok: true, environment: config.env });
  });

  app.use(apiKey);

  app.use(permissions('0000'));
  auth(app);

  return app;
};
