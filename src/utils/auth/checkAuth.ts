import { NextFunction, Request, Response } from 'express';
import logger from '../../libs/logger';
import { findById } from '../../services/api-key.service';
import { ApiKey } from '../../models/api-key.model';

const HEADERS = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};
export interface AuthRequest extends Request {
  objKey?: ApiKey;
}
const apiKey = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADERS.API_KEY]?.toString();
    if (!key) {
      res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    const objKey = await findById(key);

    if (!objKey) {
      res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    req.objKey = objKey;

    next();
  } catch (error) {
    logger.error(error);
  }
};

const permissions = (permissions: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.objKey.permissions) {
      res.status(403).json({
        message: 'Permissions dinied',
      });
    }

    console.log(req.objKey.permissions);

    const inValid = req.objKey.permissions.includes(permissions);

    if (!inValid) {
      res.status(403).json({
        message: 'Permissions dinied',
      });
    }

    next();
  };
};

export { apiKey, permissions };
