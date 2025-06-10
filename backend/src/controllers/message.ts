import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getMessages(request: FastifyRequest, reply: FastifyReply) {
  const messages = await prisma.message.findMany();
  reply.send(messages);
}

export async function getMessage(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const message = await prisma.message.findUnique({ where: { id } });
  if (!message) {
    reply.status(404).send({ message: 'Message not found' });
    return;
  }
  reply.send(message);
}

export async function createMessage(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; conversationId: string; senderId: string; content: string };
  const message = await prisma.message.create({ data });
  reply.status(201).send(message);
}

export async function updateMessage(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { content?: string };
  try {
    const message = await prisma.message.update({ where: { id }, data });
    reply.send(message);
  } catch {
    reply.status(404).send({ message: 'Message not found' });
  }
}

export async function deleteMessage(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.message.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Message not found' });
  }
}
