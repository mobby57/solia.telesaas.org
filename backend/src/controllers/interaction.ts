import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getInteractions(request: FastifyRequest, reply: FastifyReply) {
  const interactions = await prisma.interaction.findMany();
  reply.send(interactions);
}

export async function getInteraction(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const interaction = await prisma.interaction.findUnique({ where: { id } });
  if (!interaction) {
    reply.status(404).send({ message: 'Interaction not found' });
    return;
  }
  reply.send(interaction);
}

export async function createInteraction(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; prospectId: string; channel: string; content: string };
  const interaction = await prisma.interaction.create({ data });
  reply.status(201).send(interaction);
}

export async function updateInteraction(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { channel?: string; content?: string };
  try {
    const interaction = await prisma.interaction.update({ where: { id }, data });
    reply.send(interaction);
  } catch {
    reply.status(404).send({ message: 'Interaction not found' });
  }
}

export async function deleteInteraction(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.interaction.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Interaction not found' });
  }
}
