import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Solia" width={40} height={40} />
          <span className="font-bold text-xl tracking-tight">Solia</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#features" className="hover:text-primary">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-primary">Tarifs</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <div>
          <Button variant="outline" className="mr-2">Connexion</Button>
          <Button>Commencer</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Connectez les talents aux opportunités</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Solia est la plateforme collaborative pour missions, projets, freelances et équipes. Sécurisée, rapide et puissante.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">Créer un compte</Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Pourquoi choisir Solia ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Multi-tenant sécurisé</h3>
              <p className="text-gray-600">Chaque organisation dispose de son propre espace sécurisé et isolé.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">API & Intégrations</h3>
              <p className="text-gray-600">Connectez facilement vos outils grâce aux API clés et aux webhooks.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Suivi des missions</h3>
              <p className="text-gray-600">Gérez vos projets, participants, livrables et feedbacks en un seul endroit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-6 mt-auto text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Solia. Tous droits réservés.
      </footer>
    </div>
  )
}
