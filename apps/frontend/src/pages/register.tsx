import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/button';


const registerSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Mot de passe trop court' }),
  confirmPassword: z.string().min(6, { message: 'Mot de passe trop court' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    // TODO: handle register API call
    console.log('Register data:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-violetPastel dark:bg-gray-900 p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Inscription à Solia
        </h1>
        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            placeholder="votre.email@example.com"
            {...register('email')}
            error={errors.email?.message}
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            label="Mot de passe"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Inscription...' : "S'inscrire"}
        </Button>
      </form>
    </div>
  );
}
