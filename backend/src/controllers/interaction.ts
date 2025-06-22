import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listInteractions(request: FastifyRequest, reply: FastifyReply) {
  const interactions = await prisma.interaction.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(interactions);
}

export async function getInteraction(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const interaction = await prisma.interaction.findFirst({ where: { id, tenantId } });
  if (!interaction) {
    return reply.status(404).send({ error: 'Interaction not found' });
  }
  reply.send(interaction);
}

export async function createInteraction(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const interaction = await prisma.interaction.create({ data });
  reply.status(201).send(interaction);
}

export async function updateInteraction(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.interaction.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Interaction not found or update failed' });
    }
    const updatedInteraction = await prisma.interaction.findFirst({ where: { id, tenantId } });
    reply.send(updatedInteraction);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteInteraction(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.interaction.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Interaction not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
