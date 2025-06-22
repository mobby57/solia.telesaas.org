import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listOAuthClients(request: FastifyRequest, reply: FastifyReply) {
  const clients = await prisma.oauthClient.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(clients);
}

export async function getOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const client = await prisma.oauthClient.findFirst({ where: { id, tenantId } });
  if (!client) {
    return reply.status(404).send({ error: 'OAuthClient not found' });
  }
  reply.send(client);
}

export async function createOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const client = await prisma.oauthClient.create({ data });
  reply.status(201).send(client);
}

export async function updateOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.oauthClient.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'OAuthClient not found or update failed' });
    }
    const updatedClient = await prisma.oauthClient.findFirst({ where: { id, tenantId } });
    reply.send(updatedClient);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteOAuthClient(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.oauthClient.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'OAuthClient not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
