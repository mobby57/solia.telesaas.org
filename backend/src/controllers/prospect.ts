import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listProspects(request: FastifyRequest, reply: FastifyReply) {
  const prospects = await prisma.prospect.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(prospects);
}

export async function getProspect(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const prospect = await prisma.prospect.findFirst({ where: { id, tenantId } });
  if (!prospect) {
    return reply.status(404).send({ error: 'Prospect not found' });
  }
  reply.send(prospect);
}

export async function createProspect(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  if (!data.tenantId) {
    data.tenantId = (request.user as any).tenantId;
  }
  const prospect = await prisma.prospect.create({ data });
  reply.status(201).send(prospect);
}

export async function updateProspect(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.prospect.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Prospect not found or update failed' });
    }
    const updatedProspect = await prisma.prospect.findFirst({ where: { id, tenantId } });
    reply.send(updatedProspect);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteProspect(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.prospect.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Prospect not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
