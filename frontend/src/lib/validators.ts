import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, "Confirmation requise"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
