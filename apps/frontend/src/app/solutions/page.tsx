import React from 'react';

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-offWhite text-darkGray font-primary px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-secondary mb-8 text-center">Solutions par secteur</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="font-semibold mb-2">ONG</h3>
          <p>Solutions adaptées aux organisations non gouvernementales.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="font-semibold mb-2">Collectivités</h3>
          <p>Solutions pour les administrations locales et régionales.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="font-semibold mb-2">Entreprises</h3>
          <p>Solutions pour les entreprises à mission sociale ou environnementale.</p>
        </div>
      </section>
    </main>
  );
}
