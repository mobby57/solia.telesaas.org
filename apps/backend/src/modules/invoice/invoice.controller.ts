import type { FastifyReply, FastifyRequest } from 'fastify';
import * as invoiceService from './invoice.service';

export async function getInvoices(request: FastifyRequest, reply: FastifyReply) {
  const invoices = await invoiceService.getInvoices();
  reply.send(invoices);
}

export async function createInvoice(request: FastifyRequest, reply: FastifyReply) {
  const newInvoice = await invoiceService.createInvoice(request.body);
  reply.status(201).send(newInvoice);
}

export async function getInvoiceById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const invoice = await invoiceService.getInvoiceById(request.params.id);
  if (!invoice) {
    reply.status(404).send({ message: 'Invoice not found' });
    return;
  }
  reply.send(invoice);
}

export async function updateInvoice(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedInvoice = await invoiceService.updateInvoice(request.params.id, request.body);
  if (!updatedInvoice) {
    reply.status(404).send({ message: 'Invoice not found' });
    return;
  }
  reply.send(updatedInvoice);
}

export async function deleteInvoice(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await invoiceService.deleteInvoice(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Invoice not found' });
    return;
  }
  reply.send({ message: 'Invoice deleted' });
}
