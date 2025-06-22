import type { FastifyReply, FastifyRequest } from 'fastify';
import * as organizationService from './organization.service';

export async function getOrganizations(_request: FastifyRequest, reply: FastifyReply) {
  const organizations = await organizationService.getOrganizations();
  reply.send(organizations);
}

export async function createOrganization(request: FastifyRequest, reply: FastifyReply) {
  const newOrganization = await organizationService.createOrganization(request.body);
  reply.status(201).send(newOrganization);
}

export async function getOrganizationById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const organization = await organizationService.getOrganizationById(request.params.id);
  if (!organization) {
    reply.status(404).send({ message: 'Organization not found' });
    return;
  }
  reply.send(organization);
}

export async function updateOrganization(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedOrganization = await organizationService.updateOrganization(request.params.id, request.body);
  if (!updatedOrganization) {
    reply.status(404).send({ message: 'Organization not found' });
    return;
  }
  reply.send(updatedOrganization);
}

export async function deleteOrganization(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await organizationService.deleteOrganization(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Organization not found' });
    return;
  }
  reply.status(204).send();
}
