import type { FastifyInstance } from 'fastify';
import {
  listMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/message.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/message', { preHandler: [tenantMiddleware] }, listMessages);
  fastify.get('/message/:id', { preHandler: [tenantMiddleware] }, getMessage);
  fastify.post('/message', { preHandler: [tenantMiddleware] }, createMessage);
  fastify.put('/message/:id', { preHandler: [tenantMiddleware] }, updateMessage);
  fastify.delete('/message/:id', { preHandler: [tenantMiddleware] }, deleteMessage);
}
