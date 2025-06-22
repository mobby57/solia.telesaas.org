import type { FastifyInstance } from 'fastify';
import {
  listScripts,
  getScript,
  createScript,
  updateScript,
  deleteScript,
} from '../controllers/script.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function scriptRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/', { preHandler: [tenantMiddleware] }, listScripts);
  fastify.get('/:id', { preHandler: [tenantMiddleware] }, getScript);
  fastify.post('/', { preHandler: [tenantMiddleware] }, createScript);
  fastify.put('/:id', { preHandler: [tenantMiddleware] }, updateScript);
  fastify.delete('/:id', { preHandler: [tenantMiddleware] }, deleteScript);
}
