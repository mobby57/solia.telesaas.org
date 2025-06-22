import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(users);
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const user = await prisma.user.findFirst({ where: { id, tenantId } });
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }
  reply.send(user);
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const user = await prisma.user.create({ data });
  reply.status(201).send(user);
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const user = await prisma.user.updateMany({ where: { id, tenantId }, data });
    if (user.count === 0) {
      return reply.status(404).send({ error: 'User not found or update failed' });
    }
    const updatedUser = await prisma.user.findFirst({ where: { id, tenantId } });
    reply.send(updatedUser);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.user.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'User not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
