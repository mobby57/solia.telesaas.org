import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listDonations(request: FastifyRequest, reply: FastifyReply) {
  const donations = await prisma.donation.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(donations);
}

export async function getDonation(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const donation = await prisma.donation.findFirst({ where: { id, tenantId } });
  if (!donation) {
    return reply.status(404).send({ error: 'Donation not found' });
  }
  reply.send(donation);
}

export async function createDonation(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const donation = await prisma.donation.create({ data });
  reply.status(201).send(donation);
}

export async function updateDonation(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.donation.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Donation not found or update failed' });
    }
    const updatedDonation = await prisma.donation.findFirst({ where: { id, tenantId } });
    reply.send(updatedDonation);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteDonation(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.donation.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Donation not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
