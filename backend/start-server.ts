import { buildFastify } from './src/app';

async function start() {
  try {
    const app = buildFastify();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const address = '0.0.0.0';

    await app.listen({ port, host: address });
    console.log(`Server listening at http://${address}:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();

