import type { FastifyReply, FastifyRequest } from 'fastify';
import * as tenantService from './tenant.service';

export async function getTenants(_request: FastifyRequest, reply: FastifyReply) {
  const tenants = await tenantService.getTenants();
  reply.send(tenants);
}

export async function createTenant(request: FastifyRequest, reply: FastifyReply) {
  const newTenant = await tenantService.createTenant(request.body);
  reply.status(201).send(newTenant);
}

export async function getTenantById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const tenant = await tenantService.getTenantById(request.params.id);
  if (!tenant) {
    reply.status(404).send({ message: 'Tenant not found' });
    return;
  }
  reply.send(tenant);
}

export async function updateTenant(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedTenant = await tenantService.updateTenant(request.params.id, request.body);
  if (!updatedTenant) {
    reply.status(404).send({ message: 'Tenant not found' });
    return;
  }
  reply.send(updatedTenant);
}

export async function deleteTenant(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await tenantService.deleteTenant(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Tenant not found' });
    return;
  }
  reply.status(204).send();
}
