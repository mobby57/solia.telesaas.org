import type { FastifyReply, FastifyRequest } from 'fastify';
import * as prospectService from './prospect.service';

export async function getProspects(_request: FastifyRequest, reply: FastifyReply) {
  const prospects = await prospectService.getProspects();
  reply.send(prospects);
}

export async function createProspect(request: FastifyRequest, reply: FastifyReply) {
  const newProspect = await prospectService.createProspect(request.body);
  reply.status(201).send(newProspect);
}

export async function getProspectById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const prospect = await prospectService.getProspectById(request.params.id);
  if (!prospect) {
    reply.status(404).send({ message: 'Prospect not found' });
    return;
  }
  reply.send(prospect);
}

export async function updateProspect(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedProspect = await prospectService.updateProspect(request.params.id, request.body);
  if (!updatedProspect) {
    reply.status(404).send({ message: 'Prospect not found' });
    return;
  }
  reply.send(updatedProspect);
}

export async function deleteProspect(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await prospectService.deleteProspect(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Prospect not found' });
    return;
  }
  reply.status(204).send();
}
