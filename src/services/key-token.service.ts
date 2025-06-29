import { KeyTokenModel } from "../models/keytoken.model"

class KeyTokenService {
  static createKeyPair = async ({userId, publicKey}) => {
try {
    const tokens = await KeyTokenModel.create({
      user: userId,
      publicKey
    })

    return tokens ? tokens.publicKey : null;
} catch (error) {
  return error
}
  }
}


export default KeyTokenService
