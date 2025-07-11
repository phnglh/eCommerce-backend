import JWT from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

interface AuthPayload extends JwtPayload {
  userId: string | Types.ObjectId;
  email?: string;
}

const createTokenPair = async (
  payload: AuthPayload,
  publicKey: string,
  privateKey: string,
) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '3d',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });

    JWT.verify(accessToken, publicKey, {
      algorithms: ['RS256'],
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(`CreateTokenPair Error: ${(error as Error).message}`);
  }
};

const verifyToken = (token: string, publicKey: string) => {
  try {
    const decoded = JWT.verify(token, publicKey, {
      algorithms: ['RS256'],
    });
    return { valid: true, payload: decoded as AuthPayload };
  } catch (error) {
    return { valid: false, error };
  }
};

export { createTokenPair, verifyToken };
