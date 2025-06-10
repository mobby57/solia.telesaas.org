import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getApiKeys(request: FastifyRequest, reply: FastifyReply) {
  const apiKeys = await prisma.apiKey.findMany();
  reply.send(apiKeys);
}

export async function getApiKey(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const apiKey = await prisma.apiKey.findUnique({ where: { id } });
  if (!apiKey) {
    reply.status(404).send({ message: 'ApiKey not found' });
    return;
  }
  reply.send(apiKey);
}

export async function createApiKey(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; name: string; scopes: string[] };
  const apiKey = await prisma.apiKey.create({ data });
  reply.status(201).send(apiKey);
}

export async function updateApiKey(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { name?: string; scopes?: string[] };
  try {
    const apiKey = await prisma.apiKey.update({ where: { id }, data });
    reply.send(apiKey);
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}

export async function deleteApiKey(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.apiKey.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}
