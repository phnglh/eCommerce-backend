import { ShopModel } from "../models/shop.model"
import * as bcrypt from "bcrypt"
import crypto from "node:crypto"
import KeyTokenService from "./key-token.service";
import { createTokenPair } from "../utils/auth";
import { getInfoData } from "../utils";
import PrivateKeyService from "./private-key.server";


const Roles = {
  SHOP: "SHOP",
  ADMIN: "ADMIN",
  USER: "USER",
  WRITE: "WRITE",
} as const;


class ShopService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await ShopModel.findOne({ email }).lean()

      if (holderShop) {
        return {
          code: 'xxx',
          message: "Shop already register!"
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await ShopModel.create({
        name, email, password: passwordHash, roles: [Roles.SHOP]
      })

      if (newShop) {
        // create privateKey and publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          }
        })


        console.log({ privateKey, publicKey })


        const publicKeyString = await KeyTokenService.createKeyPair({ userId: newShop.id, publicKey })

        await PrivateKeyService.savePrivateKey(newShop.id, privateKey);

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "publicKeyString error"
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString)

        console.log("publicKeyObject::", publicKeyObject)

        const tokens = await createTokenPair({ userId: newShop.id, email }, publicKeyObject, privateKey)

        console.log("Create Token Success::", tokens)

        return {
          code: "201",
          metadata: {
            shop: getInfoData({
              fields: ["_id",'name','email'],object: newShop
            }),
            tokens
          }
        }

      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

export default ShopService
