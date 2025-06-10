# Project Monorepo Setup

This repository is organized as a monorepo containing multiple workspaces:

- **backend**: The backend API server built with Fastify and TypeScript.
- **frontend**: The frontend React application using Vite and TypeScript.
- **scripts**: Utility scripts for setup, database reset, seeding, etc.
- **docs**: Documentation files.
- **infra**: Infrastructure and deployment configurations.

## Monorepo Structure

The monorepo uses npm workspaces to manage dependencies and scripts across packages. The root `package.json` defines the workspaces and common scripts.

## TypeScript Configuration

- The root `tsconfig.json` uses project references to the backend and frontend TypeScript projects.
- Both backend and frontend have their own `tsconfig.json` files with `"composite": true` enabled to support project references.

## Usage

### Install dependencies

Run the following command at the root of the repository:

```bash
npm install
```

This will install dependencies for all workspaces.

### Build all projects

To build all projects in the monorepo, run:

```bash
npm run build
```

### Run tests

To run tests across all workspaces, run:

```bash
npm run test
```

### Development

- To start the backend development server:

```bash
cd backend
npm run dev
```

- To start the frontend development server:

```bash
cd frontend
npm run dev
```

## Additional Notes

- The root `package.json` includes scripts to clean node_modules across workspaces.
- Ensure you run `npm install` only at the root to maintain workspace integrity.
- Linting and formatting configurations are shared or can be added at the root level for consistency.

## Contributing

Please follow the existing code style and run tests before submitting pull requests.

## License

This project is licensed under the ISC License.
