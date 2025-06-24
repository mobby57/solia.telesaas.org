"use client";

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../src/components/ui/button';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-violetPastel dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 grid grid-cols-[1fr_2fr] gap-16"
    >
      <section className="flex flex-col justify-center space-y-6">
        <h1 className="text-5xl font-extrabold leading-tight">
          Bienvenue chez <span className="text-mint">Solia</span>
        </h1>
        <p className="text-lg max-w-md">
          La plateforme SaaS moderne pour gérer vos missions, profils et abonnements avec fluidité et style.
        </p>
        <Button variant="primary" className="w-max">
          Commencer maintenant
        </Button>
      </section>
      <section className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-indigo rounded-lg shadow-soft p-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Fonctionnalités clés</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Gestion intuitive des missions</li>
            <li>Profil utilisateur complet</li>
            <li>Abonnements flexibles et sécurisés</li>
            <li>Interface moderne et responsive</li>
          </ul>
        </motion.div>
      </section>
    </motion.div>
  );
}
