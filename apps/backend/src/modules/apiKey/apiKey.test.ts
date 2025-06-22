import { describe, it, expect } from 'vitest';
import { createMockApiKey } from './__mocks__/apiKey.factory';

describe('apiKey model', () => {
  it('should create a mock apiKey with default values', () => {
    const apiKey = createMockApiKey();
    expect(apiKey.key).toBe('mock-api-key');
    expect(apiKey.tenantId).toBe('mock-tenant');
    expect(apiKey.scopes).toContain('read');
    expect(apiKey.scopes).toContain('write');
  });

  it('should override default values', () => {
    const apiKey = createMockApiKey({ key: 'custom-key' });
    expect(apiKey.key).toBe('custom-key');
  });
});
