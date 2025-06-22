import { z } from 'zod';

export const donationSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  userId: z.string(),
  missionId: z.string(),
  formId: z.string(),
  // Add other fields as per your Donation model here
});

export const createDonationSchema = donationSchema.omit({ id: true });
export const updateDonationSchema = donationSchema.partial();
