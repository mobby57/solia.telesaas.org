import mongoose from 'mongoose'

const ApiKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  scopes: { type: [String], default: [] },
  tenantId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const ApiKeyModel = mongoose.model('ApiKey', ApiKeySchema)
