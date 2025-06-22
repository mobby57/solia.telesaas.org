import type { FastifyInstance } from 'fastify';
import {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/role.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function roleRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/role', { preHandler: [tenantMiddleware] }, listRoles);
  fastify.get('/role/:id', { preHandler: [tenantMiddleware] }, getRole);
  fastify.post('/role', { preHandler: [tenantMiddleware] }, createRole);
  fastify.put('/role/:id', { preHandler: [tenantMiddleware] }, updateRole);
  fastify.delete('/role/:id', { preHandler: [tenantMiddleware] }, deleteRole);
}
