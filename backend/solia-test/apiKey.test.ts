import type { FastifyInstance } from 'fastify';

describe('ApiKey Controller', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    const appModule = await import('../backend/src/app');
    fastify = await appModule.default?.buildFastify ?? appModule.buildFastify;
    fastify = await fastify();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  let createdApiKeyId: string;

  test('Create ApiKey', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/apikeys',
      payload: {
        name: 'Test Key',
        tenantId: 'test-tenant',
        scopes: ['read', 'write'],
      },
    });
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.payload);
    expect(body.name).toBe('Test Key');
    createdApiKeyId = body.id;
  });

  test('Get ApiKey by ID', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `/api/apikeys/${createdApiKeyId}`,
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(body.id).toBe(createdApiKeyId);
  });

  test('Update ApiKey', async () => {
    const response = await fastify.inject({
      method: 'PUT',
      url: `/api/apikeys/${createdApiKeyId}`,
      payload: {
        name: 'Updated Key',
      },
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(body.name).toBe('Updated Key');
  });

  test('Delete ApiKey', async () => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/apikeys/${createdApiKeyId}`,
    });
    expect(response.statusCode).toBe(204);
  });

  test('Get Deleted ApiKey returns 404', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `/api/apikeys/${createdApiKeyId}`,
    });
    expect(response.statusCode).toBe(404);
  });
});
