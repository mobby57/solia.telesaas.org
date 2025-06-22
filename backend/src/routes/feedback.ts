import type { FastifyInstance } from 'fastify';
import {
  listFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../controllers/feedback.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function feedbackRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/feedback', { preHandler: [tenantMiddleware] }, listFeedbacks);
  fastify.get('/feedback/:id', { preHandler: [tenantMiddleware] }, getFeedback);
  fastify.post('/feedback', { preHandler: [tenantMiddleware] }, createFeedback);
  fastify.put('/feedback/:id', { preHandler: [tenantMiddleware] }, updateFeedback);
  fastify.delete('/feedback/:id', { preHandler: [tenantMiddleware] }, deleteFeedback);
}
