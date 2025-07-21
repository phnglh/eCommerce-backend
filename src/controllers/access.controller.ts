import { Request, Response } from 'express';
import { CREATED, OK } from '../utils/response/successResponse';
import AccessService from '../services/access.service';
import { AuthRequest } from '../utils/auth/checkAuth';

class AccessController {
  async handleRefreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    await AccessService.handleRefreshToken({ refreshToken });

    return CREATED(res, 'Get refresh token successfully');
  }
  async signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    await AccessService.signUp({ name, email, password });

    return CREATED(res, 'Shop created successfully');
  }
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await AccessService.signIn({ email, password });
    const { shop, tokens } = result;

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/v1/api/auth/refresh-token',
    });

    return OK(res, 'Login successfully', {
      accessToken: tokens.accessToken,
      shop,
    });
  }

  async logOut(req: AuthRequest, res: Response) {
    return OK(
      res,
      'Logout successfully',
      await AccessService.logOut({ keyStore: req.keyStore }),
    );
  }
}

export default new AccessController();
