import fastify from 'fastify';

const server = fastify();

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen({ port: 3001 });
    console.log('Backend server listening on http://localhost:3001');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
