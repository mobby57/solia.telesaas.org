import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../prismaClient';

export async function getInvoices(request: FastifyRequest, reply: FastifyReply) {
  const invoices = await prisma.invoice.findMany();
  reply.send(invoices);
}

export async function getInvoice(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    reply.status(404).send({ message: 'Invoice not found' });
    return;
  }
  reply.send(invoice);
}

export async function createInvoice(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { tenantId: string; userId: string; amount: number; status: string };
  const invoice = await prisma.invoice.create({ data });
  reply.status(201).send(invoice);
}

export async function updateInvoice(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as { amount?: number; status?: string };
  try {
    const invoice = await prisma.invoice.update({ where: { id }, data });
    reply.send(invoice);
  } catch {
    reply.status(404).send({ message: 'Invoice not found' });
  }
}

export async function deleteInvoice(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  try {
    await prisma.invoice.delete({ where: { id } });
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'Invoice not found' });
  }
}
