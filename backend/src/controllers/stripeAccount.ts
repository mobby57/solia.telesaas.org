import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getStripeAccounts(request: FastifyRequest, reply: FastifyReply) {
  const accounts = await prisma.stripeAccount.findMany();
  reply.send(accounts);
}

export async function getStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const account = await prisma.stripeAccount.findUnique({ where: { id } });
  if (!account) {
    reply.status(404).send({ message: 'StripeAccount not found' });
    return;
  }
  reply.send(account);
}

export async function createStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; userId: string; externalId: string };
  const account = await prisma.stripeAccount.create({ data });
  reply.status(201).send(account);
}

export async function updateStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { externalId?: string };
  try {
    const account = await prisma.stripeAccount.update({ where: { id }, data });
    reply.send(account);
  } catch {
    reply.status(404).send({ message: 'StripeAccount not found' });
  }
}

export async function deleteStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.stripeAccount.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'StripeAccount not found' });
  }
}
