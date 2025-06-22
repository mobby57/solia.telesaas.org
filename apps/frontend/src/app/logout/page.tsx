'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/login');
    }
    logout();
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p>Please wait while we log you out securely.</p>
    </div>
  );
}
