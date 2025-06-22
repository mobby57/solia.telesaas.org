import type { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser } from './auth.service';

export async function registerHandler(request: FastifyRequest, reply: FastifyReply) {
  const token = await registerUser(request, reply);
  reply.code(201).send({ token });
}

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const token = await loginUser(request, reply);
  reply.code(200).send({ token });
}
