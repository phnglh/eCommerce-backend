import { Schema, model, Document, Types } from 'mongoose';

const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';

export interface KeyToken extends Document {
  user: Types.ObjectId;
  publicKey: string;
  refreshToken: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const keyTokenSchema = new Schema<KeyToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop',
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const KeyTokenModel = model<KeyToken>(DOCUMENT_NAME, keyTokenSchema);
