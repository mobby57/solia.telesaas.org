import { z } from 'zod';

export const apiKeySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  tenantId: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  // Add other apiKey fields as needed
});

export const createApiKeySchema = apiKeySchema.omit({ id: true });
export const updateApiKeySchema = apiKeySchema.partial().omit({ id: true });
