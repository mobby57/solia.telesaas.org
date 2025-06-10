import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany();
  reply.send(users);
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }
  reply.send(user);
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  const user = await prisma.user.create({ data });
  reply.status(201).send(user);
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  try {
    const user = await prisma.user.update({ where: { id }, data });
    reply.send(user);
  } catch (error) {
    reply.status(404).send({ error: 'User not found or update failed' });
  }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  try {
    await prisma.user.delete({ where: { id } });
    reply.status(204).send();
  } catch (error) {
    reply.status(404).send({ error: 'User not found or delete failed' });
  }
}
