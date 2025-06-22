import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roleId: mongoose.Schema.Types.ObjectId,
  tenantId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
