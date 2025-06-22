import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  permissions: z.array(z.string()),
});

export const createRoleSchema = roleSchema.omit({ id: true });
export const updateRoleSchema = roleSchema.partial();
