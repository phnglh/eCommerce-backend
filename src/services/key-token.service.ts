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
  static findByUserId = async ({ userId }) => {
    const keyRecord = await KeyTokenModel.findOne({ user: userId }).lean();

    if (!keyRecord) {
      throw new Error('Public key not found');
    }

    return keyRecord;
  };

  static removeKeyById = async ({ id }) => {
    console.log('Removing key with ID:', id);
    return await KeyTokenModel.findByIdAndDelete(id);
  };
  static findByRefreshTokenUsed = async ({ refreshToken }) => {
    return await KeyTokenModel.findOne({ refreshTokensUsed: refreshToken });
  };

  static remoteKeyByUserId = async ({ userId }) => {
    return await KeyTokenModel.findByIdAndDelete({ user: userId }).lean();
  };
  static findByRefreshToken = async ({ refreshToken }) => {
    const token = await KeyTokenModel.findOne({ refreshToken }).lean();
    if (!token) {
      throw new Error('Refresh token not found');
    }
    return token;
  };
  static updateOrInsertKeyToken = async ({
    userId,
    refreshToken,
    refreshTokenUsed,
  }) => {
    const filter = { user: userId };
    const update = {
      refreshToken,
      refreshTokensUsed: refreshTokenUsed,
    };
    const options = { upsert: true, new: true };
    return await KeyTokenModel.findOneAndUpdate(filter, update, options);
  };
}

export default KeyTokenService;
