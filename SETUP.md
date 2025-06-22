# Project Setup Guide

This guide explains how to set up the project environment using NVM, install dependencies, configure Prisma with MongoDB, and run the project.

## 1. Use NVM to install Node.js v20

The project requires Node.js version 20 as specified in the `.nvmrc` file.

```bash
# Install Node.js v20 using NVM
nvm install 20

# Use Node.js v20
nvm use 20

# Verify Node.js version
node -v
```

## 2. Install dependencies

The project is a monorepo with workspaces. Run the following command at the root directory:

```bash
npm install
```

This will install dependencies for all workspaces including backend and frontend.

## 3. Configure environment variables

Create a `.env` file in the `backend` directory with the following content:

```
DATABASE_URL="your_mongodb_connection_string"
```

Replace `your_mongodb_connection_string` with your MongoDB connection string (e.g., from MongoDB Atlas).

## 4. Generate Prisma client and run migrations

Navigate to the `backend` directory and run:

```bash
npm run prisma:generate
npm run prisma:migrate
```

This will generate the Prisma client and apply migrations to your MongoDB database.

## 5. Reset and seed the database (optional)

You can create or update the following scripts to reset and seed your MongoDB database.

### scripts/reset-db.sh

```bash
#!/bin/bash
echo "Resetting MongoDB database..."
mongo $DATABASE_URL --eval "db.dropDatabase()"
```

### scripts/seed.sh

```bash
#!/bin/bash
echo "Seeding MongoDB database..."
# Add commands to seed your database here, e.g. using a Node.js script or mongo shell commands
```

Make these scripts executable:

```bash
chmod +x scripts/reset-db.sh scripts/seed.sh
```

Run them as needed:

```bash
./scripts/reset-db.sh
./scripts/seed.sh
```

## 6. Run the backend and frontend

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Notes

- The Prisma schema is located at `backend/prisma/schema.prisma`.
- The database schema diagram is provided in `DIAGRAM.PNG`.
- Update the Prisma schema if you want to add missing entities from the diagram.
- Use the provided scripts as templates and customize them as needed.

---
This completes the environment setup and project initialization using NVM and Prisma with MongoDB.

## 7. Docker Build and Run for Backend (Monorepo)

Since this is a monorepo, when building the backend Docker image, ensure the build context is set to the `backend` directory.

Use the following command to build the backend Docker image:

```bash
docker build -t backend-image -f backend/Dockerfile backend
```

This ensures the Dockerfile's relative COPY commands work correctly.

The `docker-compose.yml` is configured to build the backend service with the correct context:

```yaml
services:
  backend:
    build: ./backend
    ...
```

Use `docker-compose` commands to build and run the services for consistent context handling.

## Notes

- Always run Docker build commands for backend with `backend` as the build context.
- Use relative COPY commands in `backend/Dockerfile`.
- Use `docker-compose` for easier multi-service management.
