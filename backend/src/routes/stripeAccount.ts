import type { FastifyInstance } from 'fastify';
import {
  listStripeAccounts,
  getStripeAccount,
  createStripeAccount,
  updateStripeAccount,
  deleteStripeAccount,
} from '../controllers/stripeAccount.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function stripeAccountRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/stripeAccount', { preHandler: [tenantMiddleware] }, listStripeAccounts);
  fastify.get('/stripeAccount/:id', { preHandler: [tenantMiddleware] }, getStripeAccount);
  fastify.post('/stripeAccount', { preHandler: [tenantMiddleware] }, createStripeAccount);
  fastify.put('/stripeAccount/:id', { preHandler: [tenantMiddleware] }, updateStripeAccount);
  fastify.delete('/stripeAccount/:id', { preHandler: [tenantMiddleware] }, deleteStripeAccount);
}
