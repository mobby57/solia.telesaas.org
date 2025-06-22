import type { FastifyInstance } from 'fastify';
import {
  listDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
} from '../controllers/donation.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function donationRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/donation', { preHandler: [tenantMiddleware] }, listDonations);
  fastify.get('/donation/:id', { preHandler: [tenantMiddleware] }, getDonation);
  fastify.post('/donation', { preHandler: [tenantMiddleware] }, createDonation);
  fastify.put('/donation/:id', { preHandler: [tenantMiddleware] }, updateDonation);
  fastify.delete('/donation/:id', { preHandler: [tenantMiddleware] }, deleteDonation);
}
