import type { FastifyInstance } from 'fastify';
import {
  listOAuthClients,
  getOAuthClient,
  createOAuthClient,
  updateOAuthClient,
  deleteOAuthClient,
} from '../controllers/oauthClient.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function oauthClientRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/oauthClient', { preHandler: [tenantMiddleware] }, listOAuthClients);
  fastify.get('/oauthClient/:id', { preHandler: [tenantMiddleware] }, getOAuthClient);
  fastify.post('/oauthClient', { preHandler: [tenantMiddleware] }, createOAuthClient);
  fastify.put('/oauthClient/:id', { preHandler: [tenantMiddleware] }, updateOAuthClient);
  fastify.delete('/oauthClient/:id', { preHandler: [tenantMiddleware] }, deleteOAuthClient);
}
