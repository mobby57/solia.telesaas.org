import dotenv from 'dotenv';
dotenv.config();

import { buildApp } from './app';

async function start() {
  try {
    const app = await buildApp();
    await app.listen({ port: 3001 });
    // console.log('🚀 Server running at http://localhost:3001');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
