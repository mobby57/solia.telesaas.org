"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { RegisterSchemaType } from "../lib/validators";
import { registerSchema } from "../lib/validators";
import { registerUser } from "../lib/auth";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const res = await registerUser(data);
    if (!res.ok) setError("Erreur lors de l'inscription");
    else setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      <Input placeholder="Mot de passe" type="password" {...register("password")} />
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

      <Input placeholder="Confirmer le mot de passe" type="password" {...register("confirmPassword")} />
      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">Inscription réussie !</p>}
      <Button type="submit" className="w-full">S'inscrire</Button>
    </form>
  );
}
