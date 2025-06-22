import type { FastifyInstance } from 'fastify';
import {
  listModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
} from '../controllers/module.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function moduleRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });
  fastify.get('/module', { preHandler: [tenantMiddleware] }, listModules);
  fastify.get('/module/:id', { preHandler: [tenantMiddleware] }, getModule);
  fastify.post('/module', { preHandler: [tenantMiddleware] }, createModule);
  fastify.put('/module/:id', { preHandler: [tenantMiddleware] }, updateModule);
  fastify.delete('/module/:id', { preHandler: [tenantMiddleware] }, deleteModule);
}
