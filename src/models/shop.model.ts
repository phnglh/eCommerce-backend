import { Schema, model, Document } from "mongoose";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

export interface Shop extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const shopSchema = new Schema<Shop>(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const ShopModel = model<Shop>(DOCUMENT_NAME, shopSchema);
