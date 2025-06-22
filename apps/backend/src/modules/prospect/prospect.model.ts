import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IProspect extends Document {
  // Define prospect fields here
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProspectSchema = new Schema<IProspect>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export const ProspectModel = model<IProspect>('Prospect', ProspectSchema);
