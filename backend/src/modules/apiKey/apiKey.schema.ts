import { z } from 'zod';

export const createApiKeySchema = z.object({
  owner: z.string().email(),
  permissions: z.array(z.string()).optional(),
  ttlDays: z.number().int().positive().optional(),
});

export const listApiKeysQuerySchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const revokeApiKeyParamsSchema = z.object({
  id: z.string().min(1),
});
