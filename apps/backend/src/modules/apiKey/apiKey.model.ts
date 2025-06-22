import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ApiKey extends Document {
  key: string;
  tenantId: string;
  expiresAt?: Date;
  scopes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const apiKeySchema = new Schema<ApiKey>(
  {
    key: { type: String, required: true, unique: true },
    tenantId: { type: String, required: true, index: true },
    expiresAt: { type: Date },
    scopes: [{ type: String }],
  },
  { timestamps: true }
);

export const ApiKeyModel = model<ApiKey>('ApiKey', apiKeySchema);
