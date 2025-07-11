import { KeyTokenModel } from '../models/key-token.model';

class KeyTokenService {
  static createKeyPair = async ({ userId, publicKey, refreshToken = null }) => {
    try {
      const filter = { user: userId },
        update = {
          publicKey,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = {
          upsert: true,
          new: true,
        };
      const tokens = await KeyTokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
  static findByUserId = async ({userId}) => {
    const keyRecord = await KeyTokenModel.findOne({ user: userId }).lean();

    if (!keyRecord) {
      throw new Error('Public key not found');
    }

    return keyRecord;
  };

  static removeKeyById = async ({id}) => {
    return await KeyTokenModel.findByIdAndDelete(id)
  }
}

export default KeyTokenService;
