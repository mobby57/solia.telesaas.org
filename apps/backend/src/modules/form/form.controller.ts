import type { FastifyReply, FastifyRequest } from 'fastify';
import * as formService from './form.service';

export async function getForms(request: FastifyRequest, reply: FastifyReply) {
  const forms = await formService.getForms();
  reply.send(forms);
}

export async function createForm(request: FastifyRequest, reply: FastifyReply) {
  const newForm = await formService.createForm(request.body);
  reply.status(201).send(newForm);
}

export async function getFormById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const form = await formService.getFormById(request.params.id);
  if (!form) {
    reply.status(404).send({ message: 'Form not found' });
    return;
  }
  reply.send(form);
}

export async function updateForm(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedForm = await formService.updateForm(request.params.id, request.body);
  if (!updatedForm) {
    reply.status(404).send({ message: 'Form not found' });
    return;
  }
  reply.send(updatedForm);
}

export async function deleteForm(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await formService.deleteForm(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Form not found' });
    return;
  }
  reply.send({ message: 'Form deleted' });
}
