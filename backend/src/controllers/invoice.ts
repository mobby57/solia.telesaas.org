import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listInvoices(request: FastifyRequest, reply: FastifyReply) {
  const invoices = await prisma.invoice.findMany({
    where: { tenantId: (request.user as any).tenantId },
  });
  reply.send(invoices);
}

export async function getInvoice(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  const invoice = await prisma.invoice.findFirst({ where: { id, tenantId } });
  if (!invoice) {
    return reply.status(404).send({ error: 'Invoice not found' });
  }
  reply.send(invoice);
}

export async function createInvoice(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as any;
  data.tenantId = (request.user as any).tenantId;
  const invoice = await prisma.invoice.create({ data });
  reply.status(201).send(invoice);
}

export async function updateInvoice(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const data = request.body as any;
  const tenantId = (request.user as any).tenantId;
  try {
    const updated = await prisma.invoice.updateMany({ where: { id, tenantId }, data });
    if (updated.count === 0) {
      return reply.status(404).send({ error: 'Invoice not found or update failed' });
    }
    const updatedInvoice = await prisma.invoice.findFirst({ where: { id, tenantId } });
    reply.send(updatedInvoice);
  } catch (error) {
    reply.status(500).send({ error: 'Update failed' });
  }
}

export async function deleteInvoice(request: FastifyRequest, reply: FastifyReply) {
  const id = (request.params as any).id;
  const tenantId = (request.user as any).tenantId;
  try {
    const deleted = await prisma.invoice.deleteMany({ where: { id, tenantId } });
    if (deleted.count === 0) {
      return reply.status(404).send({ error: 'Invoice not found or delete failed' });
    }
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: 'Delete failed' });
  }
}
