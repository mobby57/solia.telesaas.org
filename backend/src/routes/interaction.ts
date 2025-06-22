import type { FastifyInstance } from 'fastify';
import {
  listInteractions,
  getInteraction,
  createInteraction,
  updateInteraction,
  deleteInteraction,
} from '../controllers/interaction.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function interactionRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/interaction', { preHandler: [tenantMiddleware] }, listInteractions);
  fastify.get('/interaction/:id', { preHandler: [tenantMiddleware] }, getInteraction);
  fastify.post('/interaction', { preHandler: [tenantMiddleware] }, createInteraction);
  fastify.put('/interaction/:id', { preHandler: [tenantMiddleware] }, updateInteraction);
  fastify.delete('/interaction/:id', { preHandler: [tenantMiddleware] }, deleteInteraction);
}
