import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getFeedbacks(request: FastifyRequest, reply: FastifyReply) {
  const feedbacks = await prisma.feedback.findMany();
  reply.send(feedbacks);
}

export async function getFeedback(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const feedback = await prisma.feedback.findUnique({ where: { id } });
  if (!feedback) {
    reply.status(404).send({ message: 'Feedback not found' });
    return;
  }
  reply.send(feedback);
}

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; userId: string; sessionId: string; comment: string };
  const feedback = await prisma.feedback.create({ data });
  reply.status(201).send(feedback);
}

export async function updateFeedback(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { comment?: string };
  try {
    const feedback = await prisma.feedback.update({ where: { id }, data });
    reply.send(feedback);
  } catch {
    reply.status(404).send({ message: 'Feedback not found' });
  }
}

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.feedback.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Feedback not found' });
  }
}
