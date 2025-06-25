'use client';

import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';

export function CTAs() {
  return (
    <section aria-label="Appels à l’action" className="max-w-6xl mx-auto px-6 py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold mb-8"
      >
        Prêt à simplifier la gestion de vos missions ?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="flex flex-col sm:flex-row justify-center gap-6"
      >
        <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 transition">
          Commencer maintenant
        </Button>
        <Button size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition">
          En savoir plus
        </Button>
      </motion.div>
    </section>
  );
}
