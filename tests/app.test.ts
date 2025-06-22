import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { createFastify } from '../solia-backend/solia-test/utils/buildFastify';

let app: FastifyInstance | null = null;

beforeAll(async () => {
  app = await createFastify();
  await app.ready();
});

afterAll(async () => {
  if (app) {
    await app.close();
    app = null;
  }
});

describe('Health Check', () => {
  it('should return status ok', async () => {
    if (!app) throw new Error('App not initialized');
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' });
  });
});



describe('Health Check', () => {
  it('should return status ok', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' });
  });

  it('should create a Fastify instance with JWT plugin', async () => {
    if (!app) throw new Error('App not initialized');
    
    // Verify JWT plugin is registered
    expect(app.hasDecorator('jwt')).toBe(true);
    expect(app.hasPlugin('@fastify/jwt')).toBe(true);
  });

  it('should register API key routes with prefix', async () => {
    if (!app) throw new Error('App not initialized');

    // Test API key endpoint exists
    const res = await app.inject({
      method: 'GET',
      url: '/api/keys'
    });
    
    expect(res.statusCode).not.toBe(404); // Route should exist
  });

  it('should have logging enabled', () => {
    if (!app) throw new Error('App not initialized');
    
    expect(app.log).toBeDefined();
    expect(app.log.level).toBe('info');
  });
});
