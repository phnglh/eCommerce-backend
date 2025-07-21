import { ShopModel } from '../models/shop.model';
import * as bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenService from './key-token.service';
import { createTokenPair, verifyToken } from '../utils/auth';
import { getInfoData } from '../utils';
import PrivateKeyService from './private-key.server';
import { Roles } from '../contants/role';
import ErrorResponse, {
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
} from '../utils/response/errorResponse';
import { HTTP_STATUS_CODE } from '../contants/httpStatusCode';
import { findByEmail } from './shop.service';

class AccessService {
  static handleRefreshToken = async ({ refreshToken }) => {
    const usedToken = await KeyTokenService.findByRefreshTokenUsed({
      refreshToken,
    });

    if (usedToken) {
      const privateKey = await PrivateKeyService.getPrivateKey(usedToken.user);

      const {
        payload: { userId },
      } = verifyToken(refreshToken, privateKey);

      console.warn('Replay attack detected for user:', userId);

      await KeyTokenService.remoteKeyByUserId({ userId });

      throw new ForbiddenError(
        'Refresh token has been used. Please login again.',
      );
    }

    const holderToken = await KeyTokenService.findByRefreshToken({
      refreshToken,
    });

    if (!holderToken) {
      throw new BadRequestError('Refresh token not found.');
    }

    const privateKey = await PrivateKeyService.getPrivateKey(holderToken.user);

    const {
      payload: { userId, email },
    } = verifyToken(refreshToken, privateKey);

    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      privateKey,
    );

    await KeyTokenService.updateOrInsertKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      refreshTokenUsed: [...holderToken.refreshTokensUsed, refreshToken],
    });

    return {
      user: { userId, email },
      tokens,
    };
  };
  static logOut = async ({ keyStore }) => {
    const delKey = await KeyTokenService.removeKeyById({ id: keyStore._id });

    return delKey;
  };
  static signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const holderShop = await ShopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new ErrorResponse({
        message: 'Shop already registered',
        status: HTTP_STATUS_CODE.CONFLICT,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await ShopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [Roles.SHOP],
    });

    if (newShop) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
      });

      const publicKeyString = await KeyTokenService.createKeyPair({
        userId: newShop.id,
        publicKey,
      });

      await PrivateKeyService.savePrivateKey(newShop.id, privateKey);

      if (!publicKeyString) {
        throw new ErrorResponse({
          message: 'Failed to create public key',
          status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        });
      }

      const tokens = await createTokenPair(
        { userId: newShop.id, email },
        publicKeyString,
        privateKey,
      );

      return {
        shop: getInfoData({
          fields: ['_id', 'name', 'email'],
          object: newShop,
        }),
        tokens,
      };
    }
  };
  static signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw BadRequestError('Shop not registered!');

    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) throw AuthFailureError('Authentication error!');

    const userId = foundShop._id.toString();

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    const publicKeyString = await KeyTokenService.createKeyPair({
      userId,
      publicKey,
    });

    await PrivateKeyService.savePrivateKey(userId, privateKey);

    if (!publicKeyString) {
      throw new ErrorResponse({
        message: 'Failed to create public key',
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      });
    }

    const tokens = await createTokenPair(
      { userId, email },
      publicKeyString,
      privateKey,
    );

    await KeyTokenService.createKeyPair({
      userId,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email'],
        object: foundShop,
      }),
      tokens,
    };
  };
}

export default AccessService;
