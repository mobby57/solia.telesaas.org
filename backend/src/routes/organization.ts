import type { FastifyInstance } from 'fastify';
import {
  listOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.js';
import authMiddleware from '../middleware/auth.js';

import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function organizationRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/organization', { preHandler: [tenantMiddleware] }, listOrganizations);
  fastify.get('/organization/:id', { preHandler: [tenantMiddleware] }, getOrganization);
  fastify.post('/organization', { preHandler: [tenantMiddleware] }, createOrganization);
  fastify.put('/organization/:id', { preHandler: [tenantMiddleware] }, updateOrganization);
  fastify.delete('/organization/:id', { preHandler: [tenantMiddleware] }, deleteOrganization);
}
