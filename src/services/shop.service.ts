import { ShopModel } from '../models/shop.model';
import * as bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenService from './key-token.service';
import { createTokenPair } from '../utils/auth';
import { getInfoData } from '../utils';
import PrivateKeyService from './private-key.server';
import { Roles } from '../contants/role';
import ErrorResponse from '../utils/response/errorResponse';
import { HTTP_STATUS_CODE } from '../contants/httpStatusCode';

class ShopService {
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
}

export default ShopService;
