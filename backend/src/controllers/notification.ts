import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getNotifications(request: FastifyRequest, reply: FastifyReply) {
  const notifications = await prisma.notification.findMany();
  reply.send(notifications);
}

export async function getNotification(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) {
    reply.status(404).send({ message: 'Notification not found' });
    return;
  }
  reply.send(notification);
}

export async function createNotification(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; type: string; targetUserId: string; content: string };
  const notification = await prisma.notification.create({ data });
  reply.status(201).send(notification);
}

export async function updateNotification(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { type?: string; targetUserId?: string; content?: string };
  try {
    const notification = await prisma.notification.update({ where: { id }, data });
    reply.send(notification);
  } catch {
    reply.status(404).send({ message: 'Notification not found' });
  }
}

export async function deleteNotification(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.notification.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Notification not found' });
  }
}
