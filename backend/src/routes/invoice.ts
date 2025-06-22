import type { FastifyInstance } from 'fastify';
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function invoiceRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });
  fastify.get('/invoice', { preHandler: [tenantMiddleware] }, listInvoices);
  fastify.get('/invoice/:id', { preHandler: [tenantMiddleware] }, getInvoice);
  fastify.post('/invoice', { preHandler: [tenantMiddleware] }, createInvoice);
  fastify.put('/invoice/:id', { preHandler: [tenantMiddleware] }, updateInvoice);
  fastify.delete('/invoice/:id', { preHandler: [tenantMiddleware] }, deleteInvoice);
}
