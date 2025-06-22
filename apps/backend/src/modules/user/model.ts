import type { Document, Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
