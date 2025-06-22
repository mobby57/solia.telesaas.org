import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listRoles(request: FastifyRequest, reply: FastifyReply) {
  const roles = await prisma.role.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(roles);
}

export async function getRole(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const role = await prisma.role.findFirst({ where: { id, tenantId } });
  if (!role) {
    return reply.status(404).send({ error: 'Role not found' });
  }
  reply.send(role);
}

export async function createRole(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const role = await prisma.role.create({ data });
  reply.status(201).send(role);
}

export async function updateRole(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.role.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Role not found or update failed' });
    }
    const updatedRole = await prisma.role.findFirst({ where: { id, tenantId } });
    reply.send(updatedRole);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteRole(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.role.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Role not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
