import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IOrganization extends Document {
  // Define organization fields here
  name: string;
  address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export const OrganizationModel = model<IOrganization>('Organization', OrganizationSchema);
