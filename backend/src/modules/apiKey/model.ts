import type { Document, Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IApiKey extends Document {
  name: string;
  hashedKey: string;
  scopes: string[];
  expiresAt?: Date;
  user: Types.ObjectId;
  tenantId: string;
}

const ApiKeySchema = new Schema<IApiKey>({
  name:      { type: String, required: true },
  hashedKey: { type: String, required: true },
  scopes:    { type: [String], default: [] },
  expiresAt: { type: Date },
  user:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tenantId:  { type: String, required: true, index: true },
}, { timestamps: true });

export const ApiKeyModel = model<IApiKey>('ApiKey', ApiKeySchema);
