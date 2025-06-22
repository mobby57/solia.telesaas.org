import type { FastifyInstance } from 'fastify';
import * as missionController from './mission.controller';

export default async function missionRoutes(app: FastifyInstance) {
  app.get('/', missionController.getMissions);
  app.post('/', missionController.createMission);
  app.get('/:id', missionController.getMissionById);
  app.patch('/:id', missionController.updateMission);
  app.delete('/:id', missionController.deleteMission);
}
