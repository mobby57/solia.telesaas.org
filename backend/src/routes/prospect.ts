import type { FastifyInstance } from 'fastify';
import {
  listProspects,
  getProspect,
  createProspect,
  updateProspect,
  deleteProspect,
} from '../controllers/prospect.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function prospectRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/prospect', { preHandler: [tenantMiddleware] }, listProspects);
  fastify.get('/prospect/:id', { preHandler: [tenantMiddleware] }, getProspect);
  fastify.post('/prospect', { preHandler: [tenantMiddleware] }, createProspect);
  fastify.put('/prospect/:id', { preHandler: [tenantMiddleware] }, updateProspect);
  fastify.delete('/prospect/:id', { preHandler: [tenantMiddleware] }, deleteProspect);
}
