import type { Document, Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IApiKey extends Document {
  name: string;
  scopes: string[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApiKeySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    scopes: { type: [String], required: true },
    tenantId: { type: String, required: true },
  },
  { timestamps: true }
);

const ApiKeyModel: Model<IApiKey> = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema);

export { ApiKeyModel };
