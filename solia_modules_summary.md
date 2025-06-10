# Synthèse des Modules et Objectifs de Solia

## Objectifs Principaux
- Assurer une communication fluide et sécurisée entre tous les acteurs (opérateurs, managers, associations, support).
- Offrir un accompagnement pédagogique continu pour professionnaliser les utilisateurs.
- Créer une expérience gamifiée et engageante dans la montée en compétence.

## Fonctions Incluses

### Chat temps réel
- Canaux spécifiques (urgences, mission, général, privé).
- Notifications personnalisées (modification planning, urgences terrain).
- Accusés de lecture, délais de réponse, pièces jointes.
- IA de supervision pour prioriser les messages et proposer des réponses.

### Formation gamifiée
- Modules pédagogiques par rôle (opérateur, manager, etc.).
- QCM interactifs, missions pratiques, badges, certificats.
- Suivi du taux de complétion + tableau de bord personnel.
- Accès conditionné à certaines fonctions selon la formation validée.

### Certification et charte
- Validation des connaissances réglementaires (RGPD, droit du fundraising).
- Signature numérique de la charte de qualité.
- Historique d’évolution de l’utilisateur visible côté manager.

## Architecture Modulaire Complète de Solia

| Module | Nom           | Description principale                                                                 |
|--------|---------------|----------------------------------------------------------------------------------------|
| 1      | UI Frontend   | React, Tailwind, dashboards multi-rôles, formulaires dynamiques.                      |
| 2      | API Gateway   | Fastify, Swagger, authentification multi-tenant, rôles.                               |
| 3      | IA Layer      | Génération de scripts, coaching, affectation auto, feedback.                          |
| 4      | Téléphonie    | Appels entrants/sortants, enregistrements, scripts intégrés.                          |
| 5      | Formulaires   | Saisie sécurisée, données partielles, validations, enrichissement.                    |
| 6      | CRM           | Historique donateurs, relances, segmentation, nurturing.                              |
| 7      | Facturation   | Paiement 70/30, factures auto, suivi du seuil fiscal, Stripe.                         |
| 8      | Logistique    | Prêt/caution matériel, suivi, alertes maintenance.                                   |
| 9      | API Publique  | OAuth2, connecteurs, audit, droits contrôlés par l’administrateur délégué.            |
| 10     | Chat & Formation | Chat interne, notifications, modules de formation, certification.                   |
