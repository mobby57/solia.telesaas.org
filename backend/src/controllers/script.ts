import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getScripts(request: FastifyRequest, reply: FastifyReply) {
  const scripts = await prisma.script.findMany();
  reply.send(scripts);
}

export async function getScript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const script = await prisma.script.findUnique({ where: { id } });
  if (!script) {
    reply.status(404).send({ message: 'Script not found' });
    return;
  }
  reply.send(script);
}

export async function createScript(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; title: string; type: string; content: string };
  const script = await prisma.script.create({ data });
  reply.status(201).send(script);
}

export async function updateScript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { title?: string; type?: string; content?: string };
  try {
    const script = await prisma.script.update({ where: { id }, data });
    reply.send(script);
  } catch {
    reply.status(404).send({ message: 'Script not found' });
  }
}

export async function deleteScript(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.script.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Script not found' });
  }
}
