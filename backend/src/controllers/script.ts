import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listScripts(request: FastifyRequest, reply: FastifyReply) {
  const scripts = await prisma.script.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(scripts);
}

export async function getScript(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const script = await prisma.script.findFirst({ where: { id, tenantId } });
  if (!script) {
    return reply.status(404).send({ error: 'Script not found' });
  }
  reply.send(script);
}

export async function createScript(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const script = await prisma.script.create({ data });
  reply.status(201).send(script);
}

export async function updateScript(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.script.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Script not found or update failed' });
    }
    const updatedScript = await prisma.script.findFirst({ where: { id, tenantId } });
    reply.send(updatedScript);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteScript(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.script.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Script not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
