import type { ApiKey } from '../apiKey.model';

export function createMockApiKey(overrides?: Partial<ApiKey>): ApiKey {
  return {
    key: 'mock-api-key',
    tenantId: 'mock-tenant',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    scopes: ['read', 'write'],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as ApiKey;
}
