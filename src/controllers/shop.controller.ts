import ShopService from '../services/shop.service';
import { Request, Response, NextFunction } from 'express';

class AccessController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
     const { name, email, password } = req.body;

      const result = await ShopService.signUp({ name, email, password });

       res.status(201).json(result); 
    } catch (error) {
      next(error);
    }
  }
}

export default new AccessController();
