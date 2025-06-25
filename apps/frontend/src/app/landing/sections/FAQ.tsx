'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Comment puis-je créer une mission ?',
    answer:
      'Vous pouvez créer une mission en accédant au tableau de bord et en cliquant sur "Nouvelle mission". Remplissez les détails et assignez des bénévoles.',
  },
  {
    question: 'Puis-je suivre les progrès des bénévoles ?',
    answer:
      'Oui, la plateforme permet de suivre l’avancement des tâches et de communiquer directement avec les bénévoles.',
  },
  {
    question: 'Comment gérer les notifications ?',
    answer:
      'Les notifications peuvent être configurées dans les paramètres de votre compte pour recevoir des alertes par email ou via l’application.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-label="Foire aux questions" className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
      <div className="space-y-6 max-w-3xl mx-auto">
        {faqs.map(({ question, answer }, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={question}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-b border-gray-200"
            >
              <button
                onClick={() => toggleIndex(index)}
              aria-expanded={!!isOpen}


              aria-controls={`faq-answer-${index}`}
              className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            >
                {question}
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <div id={`faq-answer-${index}`} className="pl-4 pb-4 text-gray-600">
                {isOpen && <p>{answer}</p>}
              </div>
            </motion.div>

          );
        })}
      </div>
    </section>
  );
}
