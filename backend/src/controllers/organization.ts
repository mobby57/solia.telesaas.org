import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listOrganizations(request: FastifyRequest, reply: FastifyReply) {
  const organizations = await prisma.organization.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(organizations);
}

export async function getOrganization(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const organization = await prisma.organization.findFirst({ where: { id, tenantId } });
  if (!organization) {
    return reply.status(404).send({ error: 'Organization not found' });
  }
  reply.send(organization);
}

export async function createOrganization(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const organization = await prisma.organization.create({ data });
  reply.status(201).send(organization);
}

export async function updateOrganization(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.organization.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Organization not found or update failed' });
    }
    const updatedOrganization = await prisma.organization.findFirst({ where: { id, tenantId } });
    reply.send(updatedOrganization);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteOrganization(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.organization.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Organization not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
