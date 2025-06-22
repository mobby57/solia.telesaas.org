import type { FastifyInstance } from 'fastify';
import * as notificationController from './notification.controller';

export default async function notificationRoutes(app: FastifyInstance) {
  app.get('/', notificationController.getNotifications);
  app.post('/', notificationController.createNotification);
  app.get('/:id', notificationController.getNotificationById);
  app.patch('/:id', notificationController.updateNotification);
  app.delete('/:id', notificationController.deleteNotification);
}
