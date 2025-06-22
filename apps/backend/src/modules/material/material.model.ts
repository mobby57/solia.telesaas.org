import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IMaterial extends Document {
  // Define material fields here
  name: string;
  description?: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const MaterialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const MaterialModel = model<IMaterial>('Material', MaterialSchema);
