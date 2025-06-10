import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getCallSessions(request: FastifyRequest, reply: FastifyReply) {
  const sessions = await prisma.callSession.findMany();
  reply.send(sessions);
}

export async function getCallSession(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const session = await prisma.callSession.findUnique({ where: { id } });
  if (!session) {
    reply.status(404).send({ message: 'CallSession not found' });
    return;
  }
  reply.send(session);
}

export async function createCallSession(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; operatorId: string; transcriptId: string; duration: number };
  const session = await prisma.callSession.create({ data });
  reply.status(201).send(session);
}

export async function updateCallSession(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { operatorId?: string; transcriptId?: string; duration?: number };
  try {
    const session = await prisma.callSession.update({ where: { id }, data });
    reply.send(session);
  } catch {
    reply.status(404).send({ message: 'CallSession not found' });
  }
}

export async function deleteCallSession(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.callSession.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'CallSession not found' });
  }
}
