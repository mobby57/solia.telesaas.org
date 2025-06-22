import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  roleId: z.string(),
  tenantId: z.string(),
  name: z.string(),
  email: z.string().email(),
  // Add other fields as per your User model here
});

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = userSchema.partial();
