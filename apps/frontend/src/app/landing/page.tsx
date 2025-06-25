'use client';

import { SplashScreen } from './components/SplashScreen';
import { Hero } from './components/Hero';
import { Features } from './sections/Features';
import { Screenshots } from './sections/Screenshots';
import { Advantages } from './sections/Advantages';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { CTAs } from './sections/CTAs';

export default function LandingPage() {
  return (
    <>
      <SplashScreen />
      <main className="min-h-screen bg-gradient-to-br from-white to-[#f0f9f4] text-gray-900 flex flex-col items-center justify-between relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute inset-0 -z-10 opacity-20 blur-3xl pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-[#3EB489] mix-blend-multiply" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[#4F46E5] mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#C8A2C8] mix-blend-multiply" />
          <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-[#FFC107] mix-blend-multiply" />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Screenshots Section */}
        <Screenshots />

        {/* Advantages Section */}
        <Advantages />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing />

        {/* FAQ Section */}
        <FAQ />

        {/* CTAs Section */}
        <CTAs />

        {/* Footer */}
        <footer className="text-sm text-gray-400 py-6 w-full text-center">
          © {new Date().getFullYear()} Solia. Tous droits réservés.
        </footer>
      </main>
    </>
  );
}
