import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IInteraction extends Document {
  // Define interaction fields here
  userId: string;
  type: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

const InteractionSchema = new Schema<IInteraction>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

export const InteractionModel = model<IInteraction>('Interaction', InteractionSchema);
