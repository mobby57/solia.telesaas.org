import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface INotification extends Document {
  // Define notification fields here
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = model<INotification>('Notification', NotificationSchema);
