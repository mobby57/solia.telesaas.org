import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ITask extends Document {
  // Define task fields here
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>('Task', TaskSchema);
