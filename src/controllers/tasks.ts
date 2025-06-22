import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {
  const tenantId = (request.user as any).tenantId;
  const tasks = await prisma.task.findMany({
    where: { tenantId },
  });
  reply.send(tasks);
}

export async function getTaskById(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const task = await prisma.task.findFirst({
    where: { id, tenantId },
  });
  if (!task) {
    return reply.status(404).send({ error: 'Task not found' });
  }
  reply.send(task);
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  if (!data || typeof data !== 'object') {
    return reply.status(400).send({ error: 'Invalid or missing request body' });
  }
  data.tenantId = (request.user as any).tenantId;
  const task = await prisma.task.create({ data });
  reply.status(201).send(task);
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  if (!data || typeof data !== 'object') {
    return reply.status(400).send({ error: 'Invalid or missing request body' });
  }
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.task.updateMany({
      where: { id, tenantId },
      data,
    });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Task not found or update failed' });
    }
    const updatedTask = await prisma.task.findFirst({ where: { id, tenantId } });
    reply.send(updatedTask);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.task.deleteMany({
      where: { id, tenantId },
    });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Task not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
