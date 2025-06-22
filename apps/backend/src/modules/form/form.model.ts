import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IForm extends Document {
  // Define form fields here
  title: string;
  description?: string;
  fields: any[];
  createdAt: Date;
  updatedAt: Date;
}

const FormSchema = new Schema<IForm>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fields: { type: Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

export const FormModel = model<IForm>('Form', FormSchema);
