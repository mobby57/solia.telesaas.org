# Installation de l'environnement de développement Solia sous Linux / WSL

Voici une **To-Do list complète, étape par étape**, pour installer tout l’environnement **de développement du projet Solia** sous **Linux / WSL** de manière propre, stable et durable (support de `pnpm`, `prisma`, `vitest`, etc.) :

---

## ✅ TO DO LIST — INSTALLATION ENVIRONNEMENT SOLIA (Linux / WSL)

### 1. 📦 Installer `nvm` (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# ou pour vérification :
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

> Recharge ton terminal :

```bash
source ~/.bashrc
```

### 2. 🟩 Installer une version de Node compatible (ex : v20)

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### 3. 📦 Activer et installer `pnpm` proprement

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

> Vérifie :

```bash
pnpm -v
```

### 4. 📁 Se placer dans ton projet Solia (copié sous WSL)

```bash
cd ~/solia-linux/solia
```

### 5. 📥 Installer toutes les dépendances des workspaces

```bash
pnpm install
```

> Cela installe pour :

* `solia-backend`
* `solia-frontend`
* tous les packages partagés, si définis

---

## 🔧 CONFIGURATION BACKEND (solia-backend)

### 6. 📦 Générer Prisma Client

```bash
cd solia-backend
pnpm dlx prisma generate
```

> Assure-toi que `@prisma/client` est bien installé :

```bash
pnpm add @prisma/client
```

> Pour modifier le schéma :

```bash
pnpm dlx prisma studio  # pour visualiser la DB
pnpm dlx prisma migrate dev  # si tu utilises une base relationnelle
```

---

## 🧪 TESTS BACKEND

### 7. 🧪 Installer outils de test (si pas encore faits)

```bash
pnpm add -D vitest tsx supertest @types/supertest
```

### 8. ▶️ Lancer les tests

```bash
pnpm test
# ou directement :
pnpm vitest
```

---

## 🚀 LANCER LE SERVEUR BACKEND

```bash
pnpm dev
# ou selon ton script :
pnpm start
```

---

## 🎨 CONFIGURATION FRONTEND (solia-frontend)

### 9. 📥 Aller dans le frontend

```bash
cd ../solia-frontend
pnpm install
```

### 10. 🚀 Lancer le frontend

```bash
pnpm dev
```

---

## ✅ TO DO COMPLÉTÉ

| Étape                  | Statut |
| ---------------------- | ------ |
| NVM installé           | ✅      |
| Node v20 activé        | ✅      |
| PNPM activé            | ✅      |
| Dépendances installées | ✅      |
| Prisma généré          | ✅      |
| Tests configurés       | ✅      |
| Serveur backend lancé  | ✅      |
| Frontend lancé         | ✅      |

---

## 🛠️ Bonus (facultatif mais recommandé)

* Ajouter `.env` dans `solia-backend` et `solia-frontend`
* Utiliser `dotenv` pour config auto
* Configurer ESLint/Prettier
* Utiliser Husky + Lint-Staged pour Git
