import ShopService from '../services/shop.service';
import { Request, Response } from 'express';
import { CREATED } from '../utils/response/successResponse';

class AccessController {
  async signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await ShopService.signUp({ name, email, password });

    return CREATED(res, 'Shop created successfully', result);
  }
}

export default new AccessController();
