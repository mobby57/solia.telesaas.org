import type { FastifyReply, FastifyRequest } from 'fastify';

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'List of tasks' });
}

export async function getTaskById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  reply.send({ message: `Get task by id: ${request.params.id}` });
}

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'Create task' });
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'Update task' });
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'Delete task' });
}
