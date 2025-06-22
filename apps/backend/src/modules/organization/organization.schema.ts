import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  // Add other fields as per your Organization model here
});

export const createOrganizationSchema = organizationSchema.omit({ id: true });
export const updateOrganizationSchema = organizationSchema.partial();
