import React from 'react';

import LogoSolia from '../../components/LogoSolia';

'use client';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <section className="text-center max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-900">
          Welcome to Solia
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Empower your missions with our all-in-one platform for managing prospects, donations, and more.
        </p>
        <a
          href="/signup"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>
      <section className="bg-white w-full py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="p-6 border rounded shadow bg-gray-50">
              <p className="italic mb-4">"Solia transformed how we manage our missions. Highly recommended!"</p>
              <footer className="text-sm font-semibold">- Alex P.</footer>
            </blockquote>
            <blockquote className="p-6 border rounded shadow bg-gray-50">
              <p className="italic mb-4">"The multi-tenant support and billing integration saved us so much time."</p>
              <footer className="text-sm font-semibold">- Maria L.</footer>
            </blockquote>
            <blockquote className="p-6 border rounded shadow bg-gray-50">
              <p className="italic mb-4">"Beautiful design and intuitive UI. Our team loves it."</p>
              <footer className="text-sm font-semibold">- John D.</footer>
            </blockquote>
          </div>
        </div>
      </section>
      <section className="text-center max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <a
          href="/signup"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Sign Up Now
        </a>
      </section>
    </main>
  );
}
