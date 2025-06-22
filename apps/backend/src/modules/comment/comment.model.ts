import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IComment extends Document {
  // Define comment fields here
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = model<IComment>('Comment', CommentSchema);
