import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  // Add other form fields as needed
});

export const createFormSchema = formSchema.omit({ id: true });
export const updateFormSchema = formSchema.partial().omit({ id: true });
