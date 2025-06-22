import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import 'dotenv/config'; // Load environment variables from .env file
import 'module-alias/register'; // Register module aliases for testing
import type { FastifyInstance } from 'fastify'
import { createFastify } from '../solia-backend/solia-test/utils/buildFastify.js';

let app: FastifyInstance | null = null

describe('ApiKey Module', () => {
  beforeAll(async () => {
    app = await createFastify()
    await app.ready()
  }, 20000) // increase timeout for setup

  afterAll(async () => {
    if (app) {
      await app.close()
      app = null
    }
  })

  it('should create a new API key', async () => {
    if (!app) throw new Error('App not initialized')
    const response = await app.inject({
      method: 'POST',
      url: '/apiKey/create',
      payload: {
        key: 'testkey123',
        scopes: ['read', 'write'],
        tenantId: 'tenant1'
      }
    })
    expect(response.statusCode).toBe(201)
    const body = JSON.parse(response.body)
    expect(body.key).toBe('testkey123')
    expect(body.scopes).toContain('read')
  })
})
