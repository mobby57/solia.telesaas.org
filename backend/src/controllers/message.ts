import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listMessages(request: FastifyRequest, reply: FastifyReply) {
  const messages = await prisma.message.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(messages);
}

export async function getMessage(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const message = await prisma.message.findFirst({ where: { id, tenantId } });
  if (!message) {
    return reply.status(404).send({ error: 'Message not found' });
  }
  reply.send(message);
}

export async function createMessage(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const message = await prisma.message.create({ data });
  reply.status(201).send(message);
}

export async function updateMessage(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.message.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Message not found or update failed' });
    }
    const updatedMessage = await prisma.message.findFirst({ where: { id, tenantId } });
    reply.send(updatedMessage);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteMessage(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.message.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Message not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
