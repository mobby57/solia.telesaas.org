import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getFormulaires(request: FastifyRequest, reply: FastifyReply) {
  const formulaires = await prisma.formulaire.findMany();
  reply.send(formulaires);
}

export async function getFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const formulaire = await prisma.formulaire.findUnique({ where: { id } });
  if (!formulaire) {
    reply.status(404).send({ message: 'Formulaire not found' });
    return;
  }
  reply.send(formulaire);
}

export async function createFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; type: string; fields: any; status: string; donationId?: string };
  const formulaire = await prisma.formulaire.create({ data });
  reply.status(201).send(formulaire);
}

export async function updateFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { type?: string; fields?: any; status?: string; donationId?: string };
  try {
    const formulaire = await prisma.formulaire.update({ where: { id }, data });
    reply.send(formulaire);
  } catch {
    reply.status(404).send({ message: 'Formulaire not found' });
  }
}

export async function deleteFormulaire(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.formulaire.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Formulaire not found' });
  }
}
