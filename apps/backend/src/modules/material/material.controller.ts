import type { FastifyReply, FastifyRequest } from 'fastify';
import * as materialService from './material.service';

export async function getMaterials(_request: FastifyRequest, reply: FastifyReply) {
  const materials = await materialService.getMaterials();
  reply.send(materials);
}

export async function createMaterial(request: FastifyRequest, reply: FastifyReply) {
  const newMaterial = await materialService.createMaterial(request.body);
  reply.status(201).send(newMaterial);
}

export async function getMaterialById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const material = await materialService.getMaterialById(request.params.id);
  if (!material) {
    reply.status(404).send({ message: 'Material not found' });
    return;
  }
  reply.send(material);
}

export async function updateMaterial(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedMaterial = await materialService.updateMaterial(request.params.id, request.body);
  if (!updatedMaterial) {
    reply.status(404).send({ message: 'Material not found' });
    return;
  }
  reply.send(updatedMaterial);
}

export async function deleteMaterial(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await materialService.deleteMaterial(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Material not found' });
    return;
  }
  reply.status(204).send();
}
