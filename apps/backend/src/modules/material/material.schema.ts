import { z } from 'zod';

export const materialSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  status: z.string(),
  assignedTo: z.string(),
  // Add other fields as per your Material model here
});

export const createMaterialSchema = materialSchema.omit({ id: true });
export const updateMaterialSchema = materialSchema.partial();
