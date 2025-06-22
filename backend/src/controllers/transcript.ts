import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getTranscripts(request: FastifyRequest, reply: FastifyReply) {
  const transcripts = await prisma.transcript.findMany();
  reply.send(transcripts);
}

export async function getTranscript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const transcript = await prisma.transcript.findUnique({ where: { id } });
  if (!transcript) {
    reply.status(404).send({ message: 'Transcript not found' });
    return;
  }
  reply.send(transcript);
}

export async function createTranscript(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; callSessionId: string; content: string; score?: number };
  const transcript = await prisma.transcript.create({ data });
  reply.status(201).send(transcript);
}

export async function updateTranscript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { content?: string; score?: number };
  try {
    const transcript = await prisma.transcript.update({ where: { id }, data });
    reply.send(transcript);
  } catch {
    reply.status(404).send({ message: 'Transcript not found' });
  }
}

export async function deleteTranscript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.transcript.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Transcript not found' });
  }
}
