'use client';

import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-[#f0f9f4] text-gray-900 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Fond décoratif avec cercles colorés */}
      <div className={`${styles.backgroundCircles} absolute inset-0 -z-10 opacity-20 blur-3xl pointer-events-none`}>
        <div className={styles.mentheCircle} />
        <div className={styles.indigoCircle} />
        <div className={styles.violetPastelCircle} />
        <div className={styles.jauneDoreCircle} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <Image src="/logo-solia.png" alt="Solia logo" width={96} height={96} />
      </motion.div>

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center px-6 max-w-3xl"
      >
        <h1 className="text-5xl font-bold leading-tight mb-6 tracking-tight">
          Simplifiez la gestion <span className="text-indigo-600">des missions</span>
          <br /> pour les <span className="text-purple-500">organisations solidaires</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Solia est une plateforme moderne et intuitive pour coordonner les bénévoles, gérer les tâches
          et fluidifier les échanges au service de l’impact social.
        </p>

        <Button size="lg" className="text-white bg-indigo-600 hover:bg-indigo-700 transition">
          Commencer avec Solia
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} Solia. Tous droits réservés.
      </footer>
    </main>
  );
}
