import { Request, Response } from 'express';
import { CREATED, OK } from '../utils/response/successResponse';
import AccessService from '../services/access.service';
import { AuthRequest } from '../utils/auth/checkAuth';

class AccessController {
  async signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    await AccessService.signUp({ name, email, password });

    return CREATED(res, 'Shop created successfully');
  }
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await AccessService.signIn({ email, password });

    return OK(res, 'Login successfully', result);
  }

  async logOut(req: AuthRequest, res: Response) {

    return OK(res,'Logout successfully', await AccessService.logOut({keyStore: req.keyStore}))
  }
}

export default new AccessController();
