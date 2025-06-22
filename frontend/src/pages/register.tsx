import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(email, password, confirmPassword);
      // Redirect or update UI on success
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </main>
  );
}
