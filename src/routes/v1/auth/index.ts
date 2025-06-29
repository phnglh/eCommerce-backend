import { Router } from 'express';
import accessController from '../../../controllers/shop.controller';

export default (app: Router) => {
  const router = Router();

  router.post('/signup', accessController.signUp); 

  app.use('/auth', router); 
};
