import React from 'react';

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-offWhite text-darkGray font-primary px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-secondary mb-8 text-center">Comparaison : Solia vs Evergiving</h1>

      <section className="bg-white rounded-lg shadow p-6 mb-10">
        <p className="mb-4">
          Solia est conçu pour être une plateforme terrain + SaaS multi-usage, mieux adaptée que Evergiving pour les ONG, collectivités, et entreprises de mission terrain.
        </p>
        <p className="mb-4 font-semibold">Voici pourquoi Solia est plus adapté :</p>
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-blueViolet text-white">
              <th className="border border-gray-300 px-4 py-2">Axe</th>
              <th className="border border-gray-300 px-4 py-2">Solia</th>
              <th className="border border-gray-300 px-4 py-2">Evergiving</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Multi-sectoriel</td>
              <td className="border border-gray-300 px-4 py-2">Ne se limite pas à la collecte de dons, couvre vérif terrain, RH, urbanisme, logistique</td>
              <td className="border border-gray-300 px-4 py-2">Limité à la collecte de dons</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Custom métiers</td>
              <td className="border border-gray-300 px-4 py-2">Champs/formulaires configurables par mission</td>
              <td className="border border-gray-300 px-4 py-2">Outils figés, peu personnalisables</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Multi-tenant fort</td>
              <td className="border border-gray-300 px-4 py-2">Clients/organisations isolés dans l’app</td>
              <td className="border border-gray-300 px-4 py-2">Moins d’isolation entre clients</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">API publique native</td>
              <td className="border border-gray-300 px-4 py-2">Connexion CRM, BI, no-code possible</td>
              <td className="border border-gray-300 px-4 py-2">API privée, moins d’ouverture</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Design UX moderne</td>
              <td className="border border-gray-300 px-4 py-2">Framer Motion, UI smooth, Dark/Light mode</td>
              <td className="border border-gray-300 px-4 py-2">Fonctionnel mais rigide</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Web + Mobile PWA</td>
              <td className="border border-gray-300 px-4 py-2">Optimisé mobile + offline PWA (à venir)</td>
              <td className="border border-gray-300 px-4 py-2">Pas optimisé pour usage terrain offline</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="text-center">
        <p className="italic text-gray-600">
          Solia est plus qu’une plateforme de collecte, c’est une boîte à outils terrain pour ONG, collectivités, entreprises à missions répétitives ou mobiles.
        </p>
      </section>
    </main>
  );
}
