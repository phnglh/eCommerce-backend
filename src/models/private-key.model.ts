import { Schema, model, Document, Types } from 'mongoose';

const DOCUMENT_NAME = 'PrivateKey';
const COLLECTION_NAME = 'PrivateKeys';

export interface PrivateKeyDoc extends Document {
  user: Types.ObjectId;
  encryptedPrivateKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const privateKeySchema = new Schema<PrivateKeyDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop',
      unique: true,
    },
    encryptedPrivateKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const PrivateKeyModel = model<PrivateKeyDoc>(
  DOCUMENT_NAME,
  privateKeySchema,
);
