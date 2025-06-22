"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginSchemaType } from "../../lib/validators";
import { loginSchema } from "../../lib/validators";
import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login: loginCtx } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await login(data);
    if (!res.ok) setError("Identifiants invalides");
    else {
      const user = { email: data.email };
      loginCtx(localStorage.getItem("token")!, user);
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      <Input placeholder="Mot de passe" type="password" {...register("password")} />
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full">Se connecter</Button>
    </form>
  );
}
