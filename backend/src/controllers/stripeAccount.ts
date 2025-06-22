import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listStripeAccounts(request: FastifyRequest, reply: FastifyReply) {
  const accounts = await prisma.stripeAccount.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(accounts);
}

export async function getStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const account = await prisma.stripeAccount.findFirst({ where: { id, tenantId } });
  if (!account) {
    return reply.status(404).send({ error: 'StripeAccount not found' });
  }
  reply.send(account);
}

export async function createStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const account = await prisma.stripeAccount.create({ data });
  reply.status(201).send(account);
}

export async function updateStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.stripeAccount.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'StripeAccount not found or update failed' });
    }
    const updatedAccount = await prisma.stripeAccount.findFirst({ where: { id, tenantId } });
    reply.send(updatedAccount);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteStripeAccount(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.stripeAccount.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'StripeAccount not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
