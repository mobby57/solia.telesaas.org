import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getModules(request: FastifyRequest, reply: FastifyReply) {
  const modules = await prisma.module.findMany();
  reply.send(modules);
}

export async function getModule(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const module = await prisma.module.findUnique({ where: { id } });
  if (!module) {
    reply.status(404).send({ message: 'Module not found' });
    return;
  }
  reply.send(module);
}

export async function createModule(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; title: string; type: string; scoreMax: number };
  const module = await prisma.module.create({ data });
  reply.status(201).send(module);
}

export async function updateModule(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { title?: string; type?: string; scoreMax?: number };
  try {
    const module = await prisma.module.update({ where: { id }, data });
    reply.send(module);
  } catch {
    reply.status(404).send({ message: 'Module not found' });
  }
}

export async function deleteModule(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.module.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Module not found' });
  }
}
