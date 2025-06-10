import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../index';

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tenantId = request.headers['x-tenant-id'] as string;
    const tasks = await prisma.task.findMany({
      where: { tenantId },
    });
    reply.send(tasks);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch tasks' });
  }
}

export async function getTaskById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tenantId = request.headers['x-tenant-id'] as string;
    const { id } = request.params as { id: string };
    const task = await prisma.task.findFirst({
      where: { id, tenantId },
    });
    if (!task) {
      reply.status(404).send({ error: 'Task not found' });
      return;
    }
    reply.send(task);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch task' });
  }
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tenantId = request.headers['x-tenant-id'] as string;
    const data = request.body as {
      type: string;
      date: string;
      userId: string;
      missionId: string;
      title: string;
      description?: string;
      dueDate?: string;
      status: string;
    };
    const task = await prisma.task.create({
      data: {
        tenantId,
        type: data.type,
        date: new Date(data.date),
        userId: data.userId,
        missionId: data.missionId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        status: data.status,
      },
    });
    reply.status(201).send(task);
  } catch (error) {
    reply.status(500).send({ error: 'Failed to create task' });
  }
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tenantId = request.headers['x-tenant-id'] as string;
    const { id } = request.params as { id: string };
    const data = request.body as {
      type?: string;
      date?: string;
      userId?: string;
      missionId?: string;
      title?: string;
      description?: string;
      dueDate?: string;
      status?: string;
    };
    const task = await prisma.task.updateMany({
      where: { id, tenantId },
      data: {
        type: data.type,
        date: data.date ? new Date(data.date) : undefined,
        userId: data.userId,
        missionId: data.missionId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        status: data.status,
      },
    });
    if (task.count === 0) {
      reply.status(404).send({ error: 'Task not found or no permission' });
      return;
    }
    reply.send({ message: 'Task updated' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to update task' });
  }
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tenantId = request.headers['x-tenant-id'] as string;
    const { id } = request.params as { id: string };
    const task = await prisma.task.deleteMany({
      where: { id, tenantId },
    });
    if (task.count === 0) {
      reply.status(404).send({ error: 'Task not found or no permission' });
      return;
    }
    reply.send({ message: 'Task deleted' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to delete task' });
  }
}
