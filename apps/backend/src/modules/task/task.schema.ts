import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  operatorId: z.string(),
  missionId: z.string(),
  // Add other fields as per your Task model here
});

export const createTaskSchema = taskSchema.omit({ id: true });
export const updateTaskSchema = taskSchema.partial();
