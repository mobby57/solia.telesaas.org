import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listFormulaires(request: FastifyRequest, reply: FastifyReply) {
  const formulaires = await prisma.formulaire.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(formulaires);
}

export async function getFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const formulaire = await prisma.formulaire.findFirst({ where: { id, tenantId } });
  if (!formulaire) {
    return reply.status(404).send({ error: 'Formulaire not found' });
  }
  reply.send(formulaire);
}

export async function createFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  if (!data || typeof data !== 'object') {
    return reply.status(400).send({ error: 'Invalid or missing request body' });
  }
  data.tenantId = (request.user as any).tenantId;
  const formulaire = await prisma.formulaire.create({ data });
  reply.status(201).send(formulaire);
}

export async function updateFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  if (!data || typeof data !== 'object') {
    return reply.status(400).send({ error: 'Invalid or missing request body' });
  }
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.formulaire.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Formulaire not found or update failed' });
    }
    const updatedFormulaire = await prisma.formulaire.findFirst({ where: { id, tenantId } });
    reply.send(updatedFormulaire);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}


export async function deleteFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.formulaire.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Formulaire not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
