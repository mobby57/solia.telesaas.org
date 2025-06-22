import type { FastifyInstance } from 'fastify';
import * as auditLogController from './auditLog.controller';

export default async function auditLogRoutes(app: FastifyInstance) {
  app.get('/', auditLogController.getAuditLogs);
  app.post('/', auditLogController.createAuditLog);
  app.get('/:id', auditLogController.getAuditLogById);
  app.patch('/:id', auditLogController.updateAuditLog);
  app.delete('/:id', auditLogController.deleteAuditLog);
}
