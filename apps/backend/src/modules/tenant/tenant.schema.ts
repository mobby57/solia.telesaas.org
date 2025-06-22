import { z } from 'zod';

export const tenantSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  name: z.string(),
  // Add other fields as per your Tenant model here
});

export const createTenantSchema = tenantSchema.omit({ id: true });
export const updateTenantSchema = tenantSchema.partial();
