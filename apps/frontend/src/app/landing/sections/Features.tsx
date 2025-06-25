'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Coordination simplifiée',
    description: 'Organisez facilement les missions et les bénévoles avec une interface intuitive.',
  },
  {
    title: 'Gestion des tâches',
    description: 'Attribuez, suivez et gérez les tâches en temps réel pour une meilleure efficacité.',
  },
  {
    title: 'Communication fluide',
    description: 'Facilitez les échanges entre les membres grâce à des outils intégrés.',
  },
];

export function Features() {
  return (
    <section aria-label="Fonctionnalités clés" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités clés</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {features.map(({ title, description }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <svg
              className="w-12 h-12 text-indigo-600 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
