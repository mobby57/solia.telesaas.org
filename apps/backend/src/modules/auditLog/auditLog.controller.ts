import type { FastifyReply, FastifyRequest } from 'fastify';
import * as auditLogService from './auditLog.service';

export async function getAuditLogs(request: FastifyRequest, reply: FastifyReply) {
  const auditLogs = await auditLogService.getAuditLogs();
  reply.send(auditLogs);
}

export async function createAuditLog(request: FastifyRequest, reply: FastifyReply) {
  const newAuditLog = await auditLogService.createAuditLog(request.body);
  reply.status(201).send(newAuditLog);
}

export async function getAuditLogById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const auditLog = await auditLogService.getAuditLogById(request.params.id);
  if (!auditLog) {
    reply.status(404).send({ message: 'AuditLog not found' });
    return;
  }
  reply.send(auditLog);
}

export async function updateAuditLog(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedAuditLog = await auditLogService.updateAuditLog(request.params.id, request.body);
  if (!updatedAuditLog) {
    reply.status(404).send({ message: 'AuditLog not found' });
    return;
  }
  reply.send(updatedAuditLog);
}

export async function deleteAuditLog(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await auditLogService.deleteAuditLog(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'AuditLog not found' });
    return;
  }
  reply.send({ message: 'AuditLog deleted' });
}
