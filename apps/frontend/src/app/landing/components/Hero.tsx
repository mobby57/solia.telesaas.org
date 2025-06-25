'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';

export function Hero() {
  return (
    <section
      aria-label="Hero section"
      className="relative flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto"
    >
      {/* Animated logo splash */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <Image
          src="/logo.png"
          alt="Solia logo"
          width={120}
          height={120}
          priority
          className="mx-auto"
        />
      </motion.div>

      {/* Slogan */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-5xl font-extrabold leading-tight tracking-tight max-w-4xl mb-6 text-gray-900"
      >
        Simplifiez la gestion <span className="text-indigo-600">des missions</span> <br />
        pour les <span className="text-purple-500">organisations solidaires</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-gray-600 max-w-3xl mb-10"
      >
        Solia est une plateforme moderne et intuitive pour coordonner les bénévoles, gérer les tâches
        et fluidifier les échanges au service de l’impact social.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <Button size="lg" className="text-white bg-indigo-600 hover:bg-indigo-700 transition">
          Commencer avec Solia
        </Button>
      </motion.div>
    </section>
  );
}
