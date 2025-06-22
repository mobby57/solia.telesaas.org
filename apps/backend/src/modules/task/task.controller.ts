import type { FastifyReply, FastifyRequest } from 'fastify';
import * as taskService from './task.service';

export async function getTasks(_request: FastifyRequest, reply: FastifyReply) {
  const tasks = await taskService.getTasks();
  reply.send(tasks);
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const newTask = await taskService.createTask(request.body);
  reply.status(201).send(newTask);
}

export async function getTaskById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const task = await taskService.getTaskById(request.params.id);
  if (!task) {
    reply.status(404).send({ message: 'Task not found' });
    return;
  }
  reply.send(task);
}

export async function updateTask(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedTask = await taskService.updateTask(request.params.id, request.body);
  if (!updatedTask) {
    reply.status(404).send({ message: 'Task not found' });
    return;
  }
  reply.send(updatedTask);
}

export async function deleteTask(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await taskService.deleteTask(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Task not found' });
    return;
  }
  reply.status(204).send();
}
