import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ITenant extends Document {
  // Define tenant fields here
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const TenantModel = model<ITenant>('Tenant', TenantSchema);
