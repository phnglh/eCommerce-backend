import { Schema, model, Document } from 'mongoose';

const DOCUMENT_NAME = 'ApiConsumer';
const COLLECTION_NAME = 'ApiConsumers';

export interface ApiConsumer extends Document {
  name: string;
  description?: string;
  owner?: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const ApiConsumerSchema = new Schema<ApiConsumer>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const ApiConsumerModel = model<ApiConsumer>(
  DOCUMENT_NAME,
  ApiConsumerSchema,
);
