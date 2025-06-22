import { ApiKeyModel } from './apiKey.model'

export async function createApiKey(data: { key: string; scopes: string[]; tenantId: string }) {
  const apiKey = new ApiKeyModel(data)
  return await apiKey.save()
}
