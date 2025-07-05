import { Schema, model, Document } from 'mongoose';

const DOCUMENT_NAME = 'SystemAdmins';
const COLLECTION_NAME = 'SystemAdmin';

export interface SystemAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: 'superadmin' | 'admin';
  status: 'active' | 'disabled';
  createdAt?: Date;
  updatedAt?: Date;
}

const SystemAdminSchema = new Schema<SystemAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const SystemAdminModel = model<SystemAdmin>(
  DOCUMENT_NAME,
  SystemAdminSchema,
);
