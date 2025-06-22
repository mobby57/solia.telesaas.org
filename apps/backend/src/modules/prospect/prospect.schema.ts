import { z } from 'zod';

export const prospectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.string(),
  assignedTo: z.string(),
  // Add other fields as per your Prospect model here
});

export const createProspectSchema = prospectSchema.omit({ id: true });
export const updateProspectSchema = prospectSchema.partial();
