import { Schema, model, Document } from 'mongoose';

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

export interface ApiKey extends Document {
  // consumer: Types.ObjectId;
  apiKey: string;
  permissions: string[];
  // allowedRoutes?: string[];
  // rateLimit: number;
  expiresAt?: Date;
  status: 'active' | 'revoked';
  createdAt?: Date;
  updatedAt?: Date;
}

const ApiKeySchema = new Schema<ApiKey>(
  {
    // consumer: { type: Schema.Types.ObjectId, ref: "ApiConsumer", required: true },
    apiKey: { type: String, required: true, unique: true },
    permissions: { type: [String], default: [] },
    // allowedRoutes: { type: [String], default: [] },
    // rateLimit: { type: Number, default: 1000 },
    expiresAt: { type: Date },
    status: { type: String, enum: ['active', 'revoked'], default: 'active' },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const ApiKeyModel = model<ApiKey>(DOCUMENT_NAME, ApiKeySchema);
