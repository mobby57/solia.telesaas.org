# Solia CLI Monorepo

This repository contains the Solia project structured as a pnpm monorepo with separate frontend and backend applications.

## Project Structure

- `apps/frontend`: Next.js frontend application
- `apps/backend`: Fastify backend application
- Root contains shared configs and workspace setup

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

Run frontend and backend concurrently:

```bash
pnpm dev
```

Or run individually:

```bash
pnpm dev:frontend
pnpm dev:backend
```

### Build

Build both frontend and backend:

```bash
pnpm build
```

Or individually:

```bash
pnpm build:frontend
pnpm build:backend
```

### Start

Start the backend server (after build):

```bash
pnpm --filter backend start
```

Start the frontend server (after build):

```bash
pnpm --filter frontend start
```

### Linting and Formatting

Run ESLint:

```bash
pnpm lint
```

Fix lint issues automatically:

```bash
pnpm lint:fix
```

Format code with Prettier:

```bash
pnpm format
```

### Testing

Run tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

### Type Checking

Run TypeScript type checks:

```bash
pnpm typecheck
```

### Docker

Run development environment with Docker Compose:

```bash
pnpm docker:dev
```

Run production environment with Docker Compose:

```bash
pnpm docker:prod
```

### Database Seeding

Seed the database (backend):

```bash
pnpm db:seed
```

## Additional Notes

- Ensure you have Docker installed if you plan to use Docker commands.
- Environment variables should be configured as needed for frontend and backend.
- For any issues, check logs and run lint and tests to diagnose.

---
This README provides a CLI-friendly overview of commands and setup for Solia in a pnpm monorepo.
