import type { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from './user.service';

export async function getUsers(_request: FastifyRequest, reply: FastifyReply) {
  const users = await userService.getUsers();
  reply.send(users);
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const newUser = await userService.createUser(request.body);
  reply.status(201).send(newUser);
}

export async function getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const user = await userService.getUserById(request.params.id);
  if (!user) {
    reply.status(404).send({ message: 'User not found' });
    return;
  }
  reply.send(user);
}

export async function updateUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedUser = await userService.updateUser(request.params.id, request.body);
  if (!updatedUser) {
    reply.status(404).send({ message: 'User not found' });
    return;
  }
  reply.send(updatedUser);
}

export async function deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await userService.deleteUser(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'User not found' });
    return;
  }
  reply.status(204).send();
}
