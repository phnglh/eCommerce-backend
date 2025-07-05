import { Router } from 'express';
import accessController from '../../../controllers/shop.controller';
import asyncHandler from '../../../utils/asyncHandler';

export default (app: Router) => {
  const router = Router();

  router.post('/signup', asyncHandler(accessController.signUp));

  app.use('/auth', router);
};
