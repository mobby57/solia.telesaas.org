import type { FastifyInstance } from 'fastify';
import {
  listNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function notificationRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.get('/notification', { preHandler: [tenantMiddleware] }, listNotifications);
  fastify.get('/notification/:id', { preHandler: [tenantMiddleware] }, getNotification);
  fastify.post('/notification', { preHandler: [tenantMiddleware] }, createNotification);
  fastify.put('/notification/:id', { preHandler: [tenantMiddleware] }, updateNotification);
  fastify.delete('/notification/:id', { preHandler: [tenantMiddleware] }, deleteNotification);
}
