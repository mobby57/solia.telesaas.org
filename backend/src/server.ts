import { buildServer } from './serverInstance';

async function start() {
  const app = buildServer();
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    app.log.info('Server listening on http://0.0.0.0:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
