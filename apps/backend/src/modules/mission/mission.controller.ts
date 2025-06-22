import type { FastifyReply, FastifyRequest } from 'fastify';
import * as missionService from './mission.service';

export async function getMissions(_request: FastifyRequest, reply: FastifyReply) {
  const missions = await missionService.getMissions();
  reply.send(missions);
}

export async function createMission(request: FastifyRequest, reply: FastifyReply) {
  const newMission = await missionService.createMission(request.body);
  reply.status(201).send(newMission);
}

export async function getMissionById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const mission = await missionService.getMissionById(request.params.id);
  if (!mission) {
    reply.status(404).send({ message: 'Mission not found' });
    return;
  }
  reply.send(mission);
}

export async function updateMission(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedMission = await missionService.updateMission(request.params.id, request.body);
  if (!updatedMission) {
    reply.status(404).send({ message: 'Mission not found' });
    return;
  }
  reply.send(updatedMission);
}

export async function deleteMission(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await missionService.deleteMission(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Mission not found' });
    return;
  }
  reply.status(204).send();
}
