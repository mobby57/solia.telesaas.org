import type { FastifyInstance } from 'fastify';
import * as invoiceController from './invoice.controller';

export default async function invoiceRoutes(app: FastifyInstance) {
  app.get('/', invoiceController.getInvoices);
  app.post('/', invoiceController.createInvoice);
  app.get('/:id', invoiceController.getInvoiceById);
  app.patch('/:id', invoiceController.updateInvoice);
  app.delete('/:id', invoiceController.deleteInvoice);
}
