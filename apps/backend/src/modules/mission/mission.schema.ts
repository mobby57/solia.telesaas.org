import { z } from 'zod';

export const missionSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.string(), // ISO date string
  managerId: z.string(),
  // Add other fields as per your Mission model here
});

export const createMissionSchema = missionSchema.omit({ id: true });
export const updateMissionSchema = missionSchema.partial();
