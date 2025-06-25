'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const screenshots = [
  { src: '/screenshots/screen1.png', alt: 'Dashboard overview' },
  { src: '/screenshots/screen2.png', alt: 'Task management' },
  { src: '/screenshots/screen3.png', alt: 'Volunteer coordination' },
];

export function Screenshots() {
  return (
    <section aria-label="Screenshots and demonstration" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Screenshots &amp; Démonstration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {screenshots.map(({ src, alt }) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt={alt}
              width={400}
              height={300}
              className="object-cover w-full h-72"
              placeholder="blur"
              blurDataURL="/screenshots/placeholder.png"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
