# Utilisation de pnpm dans le monorepo Solia

Ce projet utilise désormais **pnpm** comme gestionnaire de paquets pour optimiser l'installation et la gestion des dépendances dans ce monorepo.


### Installation de pnpm

Si ce n'est pas déjà fait, installez pnpm globalement :

```bash
npm install -g pnpm
```

### Nettoyage des anciens fichiers npm

Depuis la racine du projet, supprimez les anciens dossiers `node_modules` et fichiers `package-lock.json` :

```bash
rm -rf node_modules
rm -rf backend/node_modules frontend/node_modules
rm -f package-lock.json
rm -f backend/package-lock.json frontend/package-lock.json
```

### Installation des dépendances avec pnpm

Installez toutes les dépendances du monorepo avec :

```bash
pnpm install
```

### Commandes utiles

Pour lancer le backend uniquement :

```bash
pnpm --filter backend dev
```

Pour lancer le frontend uniquement :

```bash
pnpm --filter frontend dev
```

Pour lancer les deux en parallèle :

```bash
pnpm run dev:all
```

### Versions recommandées

- Node.js : voir `.nvmrc`
- pnpm : version 8 ou supérieure

---

Cette migration permet d'avoir un monorepo plus rapide, plus léger et plus facile à maintenir.

## Test Coverage

[![Coverage Status](https://codecov.io/gh/yourusername/solia/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/solia)

Le projet maintient une couverture de test supérieure à 90% sur tous les modules backend. Les rapports de couverture sont générés avec Vitest et se trouvent dans le répertoire `backend/coverage`.
