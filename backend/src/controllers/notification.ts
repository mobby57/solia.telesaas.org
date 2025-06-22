import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listNotifications(request: FastifyRequest, reply: FastifyReply) {
  const notifications = await prisma.notification.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(notifications);
}

export async function getNotification(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const notification = await prisma.notification.findFirst({ where: { id, tenantId } });
  if (!notification) {
    return reply.status(404).send({ error: 'Notification not found' });
  }
  reply.send(notification);
}

export async function createNotification(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const notification = await prisma.notification.create({ data });
  reply.status(201).send(notification);
}

export async function updateNotification(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.notification.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Notification not found or update failed' });
    }
    const updatedNotification = await prisma.notification.findFirst({ where: { id, tenantId } });
    reply.send(updatedNotification);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteNotification(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.notification.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Notification not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
