import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getProspects(request: FastifyRequest, reply: FastifyReply) {
  const prospects = await prisma.prospect.findMany();
  reply.send(prospects);
}

export async function getProspect(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const prospect = await prisma.prospect.findUnique({ where: { id } });
  if (!prospect) {
    reply.status(404).send({ message: 'Prospect not found' });
    return;
  }
  reply.send(prospect);
}

export async function createProspect(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; name: string; status: string; assignedTo?: string };
  const prospect = await prisma.prospect.create({ data });
  reply.status(201).send(prospect);
}

export async function updateProspect(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { name?: string; status?: string; assignedTo?: string };
  try {
    const prospect = await prisma.prospect.update({ where: { id }, data });
    reply.send(prospect);
  } catch {
    reply.status(404).send({ message: 'Prospect not found' });
  }
}

export async function deleteProspect(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.prospect.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Prospect not found' });
  }
}
