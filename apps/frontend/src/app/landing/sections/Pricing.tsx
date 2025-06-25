'use client';

import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0€',
    features: [
      'Gestion basique des missions',
      'Accès aux fonctionnalités principales',
      'Support par email',
    ],
  },
  {
    name: 'Pro',
    price: '29€/mois',
    features: [
      'Gestion avancée des missions',
      'Statistiques détaillées',
      'Support prioritaire',
      'Intégrations tierces',
    ],
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    features: [
      'Solution personnalisée',
      'Support dédié',
      'Formation et accompagnement',
    ],
  },
];

export function Pricing() {
  return (
    <section aria-label="Tarification" className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-12">Tarification</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {pricingPlans.map(({ name, price, features }) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4">{name}</h3>
            <p className="text-4xl font-bold mb-6">{price}</p>
            <ul className="mb-6 space-y-2 flex-1">
              {features.map((feature) => (
                <li key={feature} className="text-gray-600 before:content-['✓'] before:text-indigo-600 before:mr-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-auto bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
              Choisir
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
