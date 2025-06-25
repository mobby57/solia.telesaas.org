'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Marie Dupont',
    role: 'Coordinatrice bénévole',
    photo: '/testimonials/marie.jpg',
    quote:
      'Solia a transformé notre manière de gérer les missions. L’interface est intuitive et facilite grandement la communication.',
  },
  {
    name: 'Jean Martin',
    role: 'Responsable associatif',
    photo: '/testimonials/jean.jpg',
    quote:
      'Une plateforme indispensable pour toute organisation solidaire souhaitant optimiser son impact.',
  },
  {
    name: 'Sophie Bernard',
    role: 'Bénévole active',
    photo: '/testimonials/sophie.jpg',
    quote:
      'Grâce à Solia, je peux facilement suivre mes missions et rester informée des besoins de l’association.',
  },
];

export function Testimonials() {
  return (
    <section aria-label="Témoignages clients" className="max-w-6xl mx-auto px-6 py-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-12">Témoignages clients</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map(({ name, role, photo, quote }) => (
          <motion.blockquote
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow"
          >
            <img
              src={photo}
              alt={`Photo de ${name}`}
              className="w-20 h-20 rounded-full mb-4 object-cover"
              loading="lazy"
            />
            <p className="text-gray-700 italic mb-4">“{quote}”</p>
            <footer className="text-sm font-semibold text-gray-900">
              {name}, <span className="text-gray-600">{role}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
