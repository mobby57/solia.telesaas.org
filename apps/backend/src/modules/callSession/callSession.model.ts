import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ICallSession extends Document {
  // Define callSession fields here
  callerId: string;
  calleeId: string;
  startTime: Date;
  endTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CallSessionSchema = new Schema<ICallSession>(
  {
    callerId: { type: String, required: true },
    calleeId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  },
  { timestamps: true }
);

export const CallSessionModel = model<ICallSession>('CallSession', CallSessionSchema);
