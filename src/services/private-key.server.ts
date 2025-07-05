import crypto from 'crypto';
import { PrivateKeyModel } from '../models/private-key.model';
import config from '../config';

class PrivateKeyService {
  static encryptPrivateKey = (privateKey: string): string => {
    const iv = crypto.randomBytes(config.encryption.ivLength);
    const cipher = crypto.createCipheriv(
      config.encryption.algorithm,
      Buffer.from(config.encryption.secretKey, 'utf-8'),
      iv,
    );
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  };

  static decryptPrivateKey = (encrypted: string): string => {
    const [ivHex, encryptedData] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      config.encryption.algorithm,
      Buffer.from(config.encryption.secretKey, 'utf-8'),
      iv,
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };

  static savePrivateKey = async (userId: string, privateKey: string) => {
    const encryptedKey = this.encryptPrivateKey(privateKey);
    const filter = { user: userId };
    const update = { encryptedPrivateKey: encryptedKey };
    const options = { upsert: true, new: true };
    return await PrivateKeyModel.findOneAndUpdate(filter, update, options);
  };

  static getPrivateKey = async (userId: string): Promise<string | null> => {
    const doc = await PrivateKeyModel.findOne({ user: userId }).lean();
    if (!doc) return null;
    return this.decryptPrivateKey(doc.encryptedPrivateKey);
  };
}

export default PrivateKeyService;
