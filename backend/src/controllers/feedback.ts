import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listFeedbacks(request: FastifyRequest, reply: FastifyReply) {
  const feedbacks = await prisma.feedback.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(feedbacks);
}

export async function getFeedback(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const feedback = await prisma.feedback.findFirst({ where: { id, tenantId } });
  if (!feedback) {
    return reply.status(404).send({ error: 'Feedback not found' });
  }
  reply.send(feedback);
}

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const feedback = await prisma.feedback.create({ data });
  reply.status(201).send(feedback);
}

export async function updateFeedback(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.feedback.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Feedback not found or update failed' });
    }
    const updatedFeedback = await prisma.feedback.findFirst({ where: { id, tenantId } });
    reply.send(updatedFeedback);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.feedback.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Feedback not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
