import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getOAuthClients(request: FastifyRequest, reply: FastifyReply) {
  const clients = await prisma.oAuthClient.findMany();
  reply.send(clients);
}

export async function getOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const client = await prisma.oAuthClient.findUnique({ where: { id } });
  if (!client) {
    reply.status(404).send({ message: 'OAuthClient not found' });
    return;
  }
  reply.send(client);
}

export async function createOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { clientId: string; redirectUri: string };
  const client = await prisma.oAuthClient.create({ data });
  reply.status(201).send(client);
}

export async function updateOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { clientId?: string; redirectUri?: string };
  try {
    const client = await prisma.oAuthClient.update({ where: { id }, data });
    reply.send(client);
  } catch {
    reply.status(404).send({ message: 'OAuthClient not found' });
  }
}

export async function deleteOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.oAuthClient.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'OAuthClient not found' });
  }
}
