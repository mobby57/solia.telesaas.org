import React from 'react';

export default function RegisterPage() {
  return (
    <main role="main" className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form aria-label="Register form" className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </main>
  );
}
