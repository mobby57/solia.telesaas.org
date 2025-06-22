import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listModules(request: FastifyRequest, reply: FastifyReply) {
  const modules = await prisma.module.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(modules);
}

export async function getModule(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const module = await prisma.module.findFirst({ where: { id, tenantId } });
  if (!module) {
    return reply.status(404).send({ error: 'Module not found' });
  }
  reply.send(module);
}

export async function createModule(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const module = await prisma.module.create({ data });
  reply.status(201).send(module);
}

export async function updateModule(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.module.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Module not found or update failed' });
    }
    const updatedModule = await prisma.module.findFirst({ where: { id, tenantId } });
    reply.send(updatedModule);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteModule(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.module.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Module not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
