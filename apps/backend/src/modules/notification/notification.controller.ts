import type { FastifyReply, FastifyRequest } from 'fastify';
import * as notificationService from './notification.service';

export async function getNotifications(request: FastifyRequest, reply: FastifyReply) {
  const notifications = await notificationService.getNotifications();
  reply.send(notifications);
}

export async function createNotification(request: FastifyRequest, reply: FastifyReply) {
  const newNotification = await notificationService.createNotification(request.body);
  reply.status(201).send(newNotification);
}

export async function getNotificationById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const notification = await notificationService.getNotificationById_(request.params.id);
  if (!notification) {
    reply.status(404).send({ message: 'Notification not found' });
    return;
  }
  reply.send(notification);
}

export async function updateNotification(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedNotification = await notificationService.updateNotification(request.params.id, request.body);
  if (!updatedNotification) {
    reply.status(404).send({ message: 'Notification not found' });
    return;
  }
  reply.send(updatedNotification);
}

export async function deleteNotification(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await notificationService.deleteNotification(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Notification not found' });
    return;
  }
  reply.send({ message: 'Notification deleted' });
}
