import type { FastifyReply, FastifyRequest } from 'fastify';
import * as roleService from './role.service';

export async function getRoles(_request: FastifyRequest, reply: FastifyReply) {
  const roles = await roleService.getRoles();
  reply.send(roles);
}

export async function createRole(request: FastifyRequest, reply: FastifyReply) {
  const newRole = await roleService.createRole(request.body);
  reply.status(201).send(newRole);
}

export async function getRoleById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const role = await roleService.getRoleById(request.params.id);
  if (!role) {
    reply.status(404).send({ message: 'Role not found' });
    return;
  }
  reply.send(role);
}

export async function updateRole(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedRole = await roleService.updateRole(request.params.id, request.body);
  if (!updatedRole) {
    reply.status(404).send({ message: 'Role not found' });
    return;
  }
  reply.send(updatedRole);
}

export async function deleteRole(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await roleService.deleteRole(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Role not found' });
    return;
  }
  reply.status(204).send();
}
