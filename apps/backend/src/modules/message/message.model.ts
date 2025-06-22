import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IMessage extends Document {
  // Define message fields here
  senderId: string;
  recipientId: string;
  content: string;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const MessageModel = model<IMessage>('Message', MessageSchema);
