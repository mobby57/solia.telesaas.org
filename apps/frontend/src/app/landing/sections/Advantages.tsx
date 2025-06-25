'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart } from 'lucide-react';

const advantages = [
  {
    icon: Star,
    title: 'Fiabilité',
    description: 'Une plateforme robuste et sécurisée pour vos missions solidaires.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    description: 'Protection des données et respect de la vie privée des utilisateurs.',
  },
  {
    icon: Heart,
    title: 'Engagement',
    description: 'Une solution pensée pour maximiser l’impact social.',
  },
];

export function Advantages() {
  return (
    <section aria-label="Avantages" className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {advantages.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center p-6"
          >
            <Icon className="w-12 h-12 text-indigo-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
