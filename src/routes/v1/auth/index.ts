import { Router } from 'express';
import accessController from '../../../controllers/access.controller';
import asyncHandler from '../../../utils/asyncHandler';
import { authentication } from '../../../utils/auth/authentication';

export default (app: Router) => {
  const router = Router();

  router.post('/signup', asyncHandler(accessController.signUp));
  router.post('/signin', asyncHandler(accessController.signIn));

  router.use(authentication);
  router.post('/logout', asyncHandler(accessController.logOut));
  router.post(
    '/refresh-token',
    asyncHandler(accessController.handleRefreshToken),
  );

  app.use('/auth', router);
};
