import { ApiKeyModel } from '../models/api-key.model';
// import crypto from "crypto"
const findById = async (key: string) => {
  // const newKey = await ApiKeyModel.create({apiKey: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
  // console.log(newKey);

  const objKey = await ApiKeyModel.findOne({
    apiKey: key,
    status: 'active',
  }).lean();

  return objKey;
};

export { findById };
